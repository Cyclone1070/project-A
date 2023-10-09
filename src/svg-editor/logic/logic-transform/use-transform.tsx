import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";
import { dragStart } from "./drag-start";
import handleTransform from "./handle-transform";
import handleKeyDown from "./keyboardShorcut";
import { useEffect, useState } from "react";
import useSelectionBox from "./use-selection-box";

const useTransform = (
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    drawMode: string,
    canvasRef: React.MutableRefObject<SVGSVGElement>
) => {
    const [isDragging, setIsDragging] = useState(false);
    const [targetIndex, setTargetIndex] = useState(-1);
    const [multiTargetIndex, setMultiTargetIndex] = useState<number[]>([]);
    const [start, setStart] = useState<{
        x?: number;
        y?: number;
        eventType?: string;
        rotateX?: number;
        rotateY?: number;
    }>({});
    const [transformNode, setTransformNode] = useState(<></>);
    const [multiTransformNodes, setMultiTransformNode] = useState<FinalSvg>([{}]);
    const [highlightNode, setHighlightNode] = useState<FinalSvg>([]);
    const {
        addSelectionBox,
        adjustSelectionBox,
        endSelection,
        selectionBox,
        multiDragStart,
        handleMultiTransform,
    } = useSelectionBox();

    function chooseTarget(e: React.MouseEvent) {
        if (
            multiTargetIndex.includes(
                finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id)
            )
        ) {
            return -1;
        } else if (
            (e.target as HTMLElement).tagName === "rect" &&
            !(e.target as HTMLElement).classList.contains("transform-node")
        ) {
            const rectIndex = finalSvg.findIndex(
                (rect) => rect.id === (e.target as HTMLElement).id
            );
            setTargetIndex(rectIndex);
            setTransformNode(
                <RectTransformNode
                    finalSvg={finalSvg}
                    rectIndex={rectIndex}
                    rotate={finalSvg[rectIndex].transform!}
                />
            );
            return rectIndex;
        } else if (
            (e.target as HTMLElement).tagName === "ellipse" &&
            !(e.target as HTMLElement).classList.contains("transform-node")
        ) {
            const ellipseIndex = finalSvg.findIndex(
                (ellipse) => ellipse.id === (e.target as HTMLElement).id
            );
            setTargetIndex(ellipseIndex);
            setTransformNode(
                <EllipseTransformNode
                    finalSvg={finalSvg}
                    ellipseIndex={ellipseIndex}
                    rotate={finalSvg[ellipseIndex].transform!}
                />
            );
            return ellipseIndex;
        } else if ((e.target as HTMLElement).tagName === "svg") {
            setTransformNode(<></>);
            setTargetIndex(-1);
            return -1;
        } else {
            return -1;
        }
    }

    const transformEvent = {
        onMouseDown: (e: React.MouseEvent) => {
            setIsDragging(true);
            const tempIndex = chooseTarget(e);
            dragStart(e, finalSvg, tempIndex, targetIndex, setStart);
            setHighlightNode([{}]);
            addSelectionBox(e);
            multiDragStart(e, finalSvg, multiTargetIndex);
            /* reset */
            if (
                !multiTargetIndex.includes(
                    finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id)
                )
            ) {
                setMultiTargetIndex([]);
                setMultiTransformNode([{}]);
            }
        },

        onMouseMove: (e: React.MouseEvent) => {
            if (isDragging) {
                handleTransform(
                    e,
                    targetIndex,
                    setTransformNode,
                    start,
                    finalSvg,
                    setFinalSvg,
                    canvasRef
                );
                handleMultiTransform(
                    e,
                    finalSvg,
                    setFinalSvg,
                    setMultiTransformNode,
                    multiTargetIndex
                );
                if (targetIndex === -1 && multiTargetIndex.length === 0) {
                    adjustSelectionBox(e);
                }
            }
            /* highlight when hover */
            if (!(e.target as HTMLElement).classList.contains("transform-node") && !isDragging) {
                setHighlightNode(() => {
                    const svgIndex = finalSvg.findIndex(
                        (svg) => svg.id === (e.target as HTMLElement).id
                    );
                    if (
                        svgIndex !== targetIndex &&
                        svgIndex !== -1 &&
                        !multiTargetIndex.includes(svgIndex)
                    ) {
                        return [
                            {
                                ...finalSvg[svgIndex],
                                className: "transform-node",
                                fill: "transparent",
                                stroke: "red",
                                style: { pointerEvents: "none" },
                            },
                        ];
                    } else {
                        return [{}];
                    }
                });
            } else setHighlightNode([{}]);
        },

        onMouseUp: () => {
            setIsDragging(false);
            setStart({});
            endSelection(
                canvasRef,
                finalSvg,
                setMultiTransformNode,
                setMultiTargetIndex,
                multiTargetIndex
            );
        },
        onMouseLeave: () => {
            setIsDragging(false);
            setStart({});
            endSelection(
                canvasRef,
                finalSvg,
                setMultiTransformNode,
                setMultiTargetIndex,
                multiTargetIndex
            );
        },
    };

    useEffect(() => {
        /* remove transform nodes on switching draw mode */
        if (drawMode !== "transform") {
            setHighlightNode([{}]);
            setTransformNode(<></>);
            setMultiTransformNode([{}]);
            setTargetIndex(-1);
        }

        /* keyboard shorcuts */
        const handleEvent = (e: KeyboardEvent) => {
            handleKeyDown(e, finalSvg, setFinalSvg, targetIndex, setTargetIndex);
        };
        window.addEventListener("keydown", handleEvent);
        return () => {
            window.removeEventListener("keydown", handleEvent);
        };
    }, [drawMode, setFinalSvg, finalSvg, targetIndex]);
    return { transformEvent, transformNode, highlightNode, selectionBox, multiTransformNodes };
};

export default useTransform;
