import { FinalSvg } from "../../types";
import { rect, ellipse } from "svg-boundings";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";
import { dragStart } from "./drag-start";
import handleTransform from "./handle-transform";
import handleKeyDown from "./keyboardShorcut";
import { useEffect, useState, useCallback } from "react";
import useSelectionBox from "./use-selection-box";

const useTransform = (
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    drawMode: string,
    canvasRef: React.MutableRefObject<SVGSVGElement>
) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isCtrlDown, setIsCtrlDown] = useState(false);
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
    const [multiTransformInfo, setMultiTransformInfo] = useState<FinalSvg>([]);
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
                    transform={finalSvg[rectIndex].transform!}
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
                    transform={finalSvg[ellipseIndex].transform!}
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
    function chooseMultiTarget(e: React.MouseEvent) {
        if (
            finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id) !== -1 &&
            !multiTargetIndex.includes(
                finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id)
            )
        ) {
            const targetIndex = finalSvg.findIndex(
                (svg) => svg.id === (e.target as HTMLElement).id
            );
            endSelection(
                canvasRef,
                setFinalSvg,
                finalSvg,
                setMultiTransformInfo,
                multiTransformInfo,
                setMultiTargetIndex,
                [...multiTargetIndex, targetIndex]
            );
            setMultiTargetIndex((prev) => {
                return [...prev, targetIndex];
            });
        } else if (
            finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id) !== -1 &&
            multiTargetIndex.includes(
                finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id)
            )
        ) {
            const newIndex = [...multiTargetIndex];
            newIndex.splice(
                multiTargetIndex.indexOf(
                    finalSvg.findIndex((svg) => svg.id === (e.target as HTMLElement).id)
                ),
                1
            );
            endSelection(
                canvasRef,
                setFinalSvg,
                finalSvg,
                setMultiTransformInfo,
                multiTransformInfo,
                setMultiTargetIndex,
                newIndex
            );
            setMultiTargetIndex(newIndex);
            setFinalSvg((prev) => {
                const newSvg = [...prev];
                const targetIndex = finalSvg.findIndex(
                    (svg) => svg.id === (e.target as HTMLElement).id
                );
                const infoIndex = multiTransformInfo.findIndex(
                    (info) => info.index === targetIndex
                );
                newSvg[targetIndex] = { ...newSvg[targetIndex], ...multiTransformInfo[infoIndex] };
                return newSvg;
            });
        }
    }

    const transformEvent = {
        onMouseDown: (e: React.MouseEvent) => {
            /* multi select when holding ctrl */
            if (e.ctrlKey || e.metaKey) {
                setIsCtrlDown(true);
                chooseMultiTarget(e);
                setTransformNode(<></>);
                setHighlightNode([{}]);
                setTargetIndex(-1);
                return;
            }
            setIsDragging(true);
            const tempIndex = chooseTarget(e);
            dragStart(e, finalSvg, tempIndex, targetIndex, setStart, canvasRef);
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
                resetMultiTransform();
            }
        },

        onMouseMove: (e: React.MouseEvent) => {
            if (isCtrlDown) {
                return;
            }
            if (isDragging) {
                handleTransform(e, targetIndex, setTransformNode, start, finalSvg, setFinalSvg);
                handleMultiTransform(e, finalSvg, setFinalSvg, multiTargetIndex);
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
            if (isCtrlDown) {
                setIsCtrlDown(false);
                return;
            }
            //reset transform center to the center of the shape
            if (targetIndex !== -1 && finalSvg[targetIndex].transform) {
                setFinalSvg((newSvg) => {
                    if (newSvg[targetIndex].tag === "rect") {
                        const bbox = rect(canvasRef.current.children[targetIndex]);
                        newSvg[targetIndex].x =
                            bbox.left + bbox.width / 2 - newSvg[targetIndex].width! / 2;
                        newSvg[targetIndex].y =
                            bbox.top + bbox.height / 2 - newSvg[targetIndex].height! / 2;
                        newSvg[targetIndex].transform = `rotate(${
                            newSvg[targetIndex].transform!.split("(")[1].split(" ")[0]
                        } ${bbox.left + bbox.width / 2} ${bbox.top + bbox.height / 2})`;
                        return newSvg;
                    } else if (newSvg[targetIndex].tag === "ellipse") {
                        const bbox = ellipse(canvasRef.current.children[targetIndex]);
                        newSvg[targetIndex].cx = bbox.left + bbox.width / 2;
                        newSvg[targetIndex].cy = bbox.top + bbox.height / 2;
                        newSvg[targetIndex].transform = `rotate(${
                            newSvg[targetIndex].transform!.split("(")[1].split(" ")[0]
                        } ${bbox.left + bbox.width / 2} ${bbox.top + bbox.height / 2})`;
                        return newSvg;
                    } else return newSvg;
                });
            }
            setIsDragging(false);
            setStart({});
            endSelection(
                canvasRef,
                setFinalSvg,
                finalSvg,
                setMultiTransformInfo,
                multiTransformInfo,
                setMultiTargetIndex,
                multiTargetIndex
            );
        },
        onMouseLeave: () => {
            if (isCtrlDown) {
                setIsCtrlDown(false);
                return;
            }
            setIsDragging(false);
            setStart({});
            endSelection(
                canvasRef,
                setFinalSvg,
                finalSvg,
                setMultiTransformInfo,
                multiTransformInfo,
                setMultiTargetIndex,
                multiTargetIndex
            );
        },
    };

    const resetMultiTransform = useCallback(() => {
        if (multiTransformInfo.length === 0) {
            return;
        }
        setFinalSvg((prev) => {
            const newFinalSvg = [...prev];
            multiTransformInfo.forEach(({ index, ...info }) => {
                newFinalSvg[index!] = { ...newFinalSvg[index!], ...info };
            });
            setMultiTransformInfo([]);
            return newFinalSvg;
        });
    }, [multiTransformInfo, setFinalSvg]);

    useEffect(() => {
        /* reset transform on switching draw mode */
        if (drawMode !== "transform") {
            setHighlightNode([{}]);
            setTransformNode(<></>);
            resetMultiTransform();
            setTargetIndex(-1);
            setMultiTargetIndex([]);
        }
    }, [drawMode, multiTransformInfo, resetMultiTransform, setFinalSvg]);
    useEffect(() => {
        /* keyboard shorcuts */
        const handleEvent = (e: KeyboardEvent) => {
            handleKeyDown(e, finalSvg, setFinalSvg, targetIndex, setTargetIndex);
        };
        window.addEventListener("keydown", handleEvent);
        return () => {
            window.removeEventListener("keydown", handleEvent);
        };
    }, [setFinalSvg, finalSvg, targetIndex]);
    return {
        transformEvent,
        transformNode,
        setTransformNode,
        highlightNode,
        selectionBox,
        multiTransformInfo,
        targetIndex,
    };
};

export default useTransform;
