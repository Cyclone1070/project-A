/* code extraction from use-transform */

import { ellipse, rect } from "svg-boundings";
import { useState } from "react";
import { FinalSvg, Rect } from "../../types";

const useSelectionBox = () => {
    const [selectionBox, setSelectionBox] = useState<Rect>({});
    const [start, setStart] = useState<{ x?: number; y?: number }>({});
    const [multiStart, setMultiStart] = useState<
        { x?: number; y?: number; rotateX?: number; rotateY?: number }[]
    >([]);

    function addSelectionBox(e: React.MouseEvent) {
        setStart({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
        setSelectionBox({
            tag: "rect",
            fill: "#007BFF33",
            stroke: "#2990FFFF",
            strokeWidth: 1.5,
        });
    }
    function adjustSelectionBox(e: React.MouseEvent) {
        setSelectionBox((prevRect) => {
            /* avoiding glichy selectionBox when event is fired before state update (drag immediately after click) */
            if (start.x && start.y) {
                return {
                    ...prevRect,
                    x: Math.min(e.nativeEvent.offsetX, start.x),
                    y: Math.min(e.nativeEvent.offsetY, start.y),
                    width: Math.abs(e.nativeEvent.offsetX - start.x),
                    height: Math.abs(e.nativeEvent.offsetY - start.y),
                };
            } else {
                return prevRect;
            }
        });
    }
    function endSelection(
        canvasRef: React.MutableRefObject<SVGSVGElement>,
        finalSvg: FinalSvg,
        setMultiTransformNodes: React.Dispatch<React.SetStateAction<FinalSvg>>,
        setMultiTargetIndex: React.Dispatch<React.SetStateAction<number[]>>,
        multiTargetIndex: number[]
    ) {
        const DOMSvgs = canvasRef.current.children;
        const tempMultiTargetIndex: number[] = [];
        /* check for targets contained in selection box */
        if (Object.keys(selectionBox).length !== 0) {
            for (let i = 0; i < DOMSvgs.length; i++) {
                if (
                    DOMSvgs[i].classList.contains("temp") ||
                    DOMSvgs[i].classList.contains("transform-node") ||
                    DOMSvgs[i].classList.contains("cross")
                ) {
                    continue;
                }
                const targetBBox = getBoudinngRect(DOMSvgs[i]);
                if (
                    selectionBox.x! <= targetBBox.left &&
                    selectionBox.y! <= targetBBox.top &&
                    selectionBox.x! + selectionBox.width! >= targetBBox.left + targetBBox.width &&
                    selectionBox.y! + selectionBox.height! >= targetBBox.top + targetBBox.height
                ) {
                    setMultiTargetIndex((prev) => {
                        return [...prev, finalSvg.findIndex((svg) => DOMSvgs[i].id === svg.id)];
                    });
                    tempMultiTargetIndex.push(
                        finalSvg.findIndex((svg) => DOMSvgs[i].id === svg.id)
                    );
                }
            }
        }
        setMultiTransformNodes(() => {
            let index = [];
            if (tempMultiTargetIndex.length !== 0) {
                index = tempMultiTargetIndex;
            } else {
                index = multiTargetIndex;
            }
            const indexedSvg: object[] = [];
            index.forEach((i) => {
                indexedSvg.push(finalSvg[i]);
            });
            const newNode = indexedSvg.map((svg) => ({
                ...svg,
                className: "transform-node",
                fill: "transparent",
                stroke: "blue",
                strokeDasharray: "8 3",
                style: { pointerEvents: "none" },
            }));
            return newNode;
        });
        setSelectionBox({});
        setStart({});
        setMultiStart([]);

        function getBoudinngRect(svg: Element) {
            if (svg.tagName === "rect") {
                return rect(svg);
            } else if (svg.tagName === "ellipse") {
                return ellipse(svg, true);
            }
        }
    }

    function multiDragStart(e: React.MouseEvent, finalSvg: FinalSvg, multiTargetIndex: number[]) {
        for (let i = 0; i < multiTargetIndex.length; i++) {
            if (finalSvg[multiTargetIndex[i]].tag === "rect") {
                setMultiStart((prevStart) => {
                    const newStart = [...prevStart];
                    let distanceToRotateCenter = {};
                    if (
                        Object.prototype.hasOwnProperty.call(
                            finalSvg[multiTargetIndex[i]],
                            "transform"
                        )
                    ) {
                        distanceToRotateCenter = {
                            rotateX:
                                e.nativeEvent.offsetX -
                                +finalSvg[multiTargetIndex[i]]
                                    .transform!.split("(")[1]
                                    .split(" ")[1],
                            rotateY:
                                e.nativeEvent.offsetY -
                                +finalSvg[multiTargetIndex[i]]
                                    .transform!.split("(")[1]
                                    .split(" ")[2]
                                    .split(")")[0],
                        };
                    }
                    newStart.push({
                        x: e.nativeEvent.offsetX - finalSvg[multiTargetIndex[i]].x!,
                        y: e.nativeEvent.offsetY - finalSvg[multiTargetIndex[i]].y!,
                        ...distanceToRotateCenter,
                    });
                    return newStart;
                });
            } else if (finalSvg[multiTargetIndex[i]].tag === "ellipse") {
                setMultiStart((prevStart) => {
                    const newStart = [...prevStart];
                    let distanceToRotateCenter = {};
                    if (
                        Object.prototype.hasOwnProperty.call(
                            finalSvg[multiTargetIndex[i]],
                            "transform"
                        )
                    ) {
                        distanceToRotateCenter = {
                            rotateX:
                                e.nativeEvent.offsetX -
                                +finalSvg[multiTargetIndex[i]]
                                    .transform!.split("(")[1]
                                    .split(" ")[1],
                            rotateY:
                                e.nativeEvent.offsetY -
                                +finalSvg[multiTargetIndex[i]]
                                    .transform!.split("(")[1]
                                    .split(" ")[2]
                                    .split(")")[0],
                        };
                    }
                    newStart.push({
                        x: e.nativeEvent.offsetX - finalSvg[multiTargetIndex[i]].cx!,
                        y: e.nativeEvent.offsetY - finalSvg[multiTargetIndex[i]].cy!,
                        ...distanceToRotateCenter,
                    });
                    return newStart;
                });
            }
        }
    }
    function handleMultiTransform(
        e: React.MouseEvent,
        finalSvg: FinalSvg,
        setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
        setMultiTransformNodes: React.Dispatch<React.SetStateAction<FinalSvg>>,
        multiTargetIndex: number[]
    ) {
        for (let i = 0; i < multiTargetIndex.length; i++) {
            if (finalSvg[multiTargetIndex[i]].tag === "rect") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[multiTargetIndex[i]].x! = e.nativeEvent.offsetX - multiStart[i].x!;
                    prevRect[multiTargetIndex[i]].y! = e.nativeEvent.offsetY - multiStart[i].y!;
                    if (prevRect[multiTargetIndex[i]].transform) {
                        prevRect[multiTargetIndex[i]].transform = `rotate(${
                            prevRect[multiTargetIndex[i]].transform?.split("(")[1].split(" ")[0]
                        } ${e.nativeEvent.offsetX - multiStart[i].rotateX!} ${
                            e.nativeEvent.offsetY - multiStart[i].rotateY!
                        })`;
                    }
                    return prevRect;
                });
            } else if (finalSvg[multiTargetIndex[i]].tag === "ellipse") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevEllipse = [...prevSvg];
                    prevEllipse[multiTargetIndex[i]].cx! = e.nativeEvent.offsetX - multiStart[i].x!;
                    prevEllipse[multiTargetIndex[i]].cy! = e.nativeEvent.offsetY - multiStart[i].y!;
                    if (prevEllipse[multiTargetIndex[i]].transform) {
                        prevEllipse[multiTargetIndex[i]].transform = `rotate(${
                            prevEllipse[multiTargetIndex[i]].transform?.split("(")[1].split(" ")[0]
                        } ${e.nativeEvent.offsetX - multiStart[i].rotateX!} ${
                            e.nativeEvent.offsetY - multiStart[i].rotateY!
                        })`;
                    }
                    return prevEllipse;
                });
            }
            setMultiTransformNodes(() => {
                const indexedSvg = [{}];
                multiTargetIndex.forEach((i) => {
                    indexedSvg.push(finalSvg[i]);
                });
                const newNode = indexedSvg.map((svg) => ({
                    ...svg,
                    className: "transform-node",
                    fill: "transparent",
                    stroke: "blue",
                    strokeDasharray: "8 3",
                    style: { pointerEvents: "none" },
                }));
                return newNode;
            });
        }
    }

    return {
        addSelectionBox,
        adjustSelectionBox,
        endSelection,
        selectionBox,
        multiDragStart,
        handleMultiTransform,
    };
};

export default useSelectionBox;
