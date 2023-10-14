/* code extraction from use-transform */

import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";

const handleTransform = (
    e: React.MouseEvent,
    targetIndex: number,
    setTransformNode: React.Dispatch<React.SetStateAction<JSX.Element>>,
    start: { x?: number; y?: number; eventType?: string; rotateX?: number; rotateY?: number },
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>
) => {
    let mouseX = e.nativeEvent.offsetX;
    let mouseY = e.nativeEvent.offsetY;
    if (
        targetIndex !== -1 &&
        Object.prototype.hasOwnProperty.call(finalSvg[targetIndex], "transform")
    ) {
        const rad =
            -+finalSvg[targetIndex].transform!.split("(")[1].split(" ")[0] * (Math.PI / 180);
        const x = mouseX - +finalSvg[targetIndex].transform!.split("(")[1].split(" ")[1];
        const y =
            mouseY - +finalSvg[targetIndex].transform!.split("(")[1].split(" ")[2].split(")")[0];
        const newX = x * Math.cos(rad) - y * Math.sin(rad);
        const newY = x * Math.sin(rad) + y * Math.cos(rad);
        mouseX = newX + +finalSvg[targetIndex].transform!.split("(")[1].split(" ")[1];
        mouseY = newY + +finalSvg[targetIndex].transform!.split("(")[1].split(" ")[2].split(")")[0];
    }
    if (targetIndex !== -1 && finalSvg[targetIndex].tag === "rect") {
        if (start.eventType === "height") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevRect = [...prevSvg];
                prevRect[targetIndex].y = Math.min(mouseY, start.y!);
                prevRect[targetIndex].height = Math.abs(mouseY - start.y!);
                return prevRect;
            });
        } else if (start.eventType === "width") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevRect = [...prevSvg];
                prevRect[targetIndex].x = Math.min(mouseX, start.x!);
                prevRect[targetIndex].width = Math.abs(mouseX - start.x!);
                return prevRect;
            });
        } else if (start.eventType === "corner") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevRect = [...prevSvg];
                prevRect[targetIndex].x = Math.min(mouseX, start.x!);
                prevRect[targetIndex].y = Math.min(mouseY, start.y!);
                prevRect[targetIndex].width = Math.abs(mouseX - start.x!);
                prevRect[targetIndex].height = Math.abs(mouseY - start.y!);
                return prevRect;
            });
        } else if (start.eventType === "drag") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevRect = [...prevSvg];
                prevRect[targetIndex].x! = e.nativeEvent.offsetX - start.x!;
                prevRect[targetIndex].y! = e.nativeEvent.offsetY - start.y!;
                if (prevRect[targetIndex].transform) {
                    prevRect[targetIndex].transform = `rotate(${
                        prevRect[targetIndex].transform?.split("(")[1].split(" ")[0]
                    } ${e.nativeEvent.offsetX - start.rotateX!} ${
                        e.nativeEvent.offsetY - start.rotateY!
                    })`;
                }
                /* avoid visual delay, fix this if encounter performance issue */
                setTransformNode(
                    <RectTransformNode
                        finalSvg={finalSvg}
                        rectIndex={targetIndex}
                        rotate={finalSvg[targetIndex].transform!}
                    />
                );
                return prevRect;
            });
        } else if (start.eventType === "rotate") {
            const angle = (
                Math.atan2(e.nativeEvent.offsetY - start.y!, e.nativeEvent.offsetX - start.x!) *
                    (180 / Math.PI) +
                90
            ).toFixed(1);
            setFinalSvg((prevSvgs) => {
                const newSvgs = [...prevSvgs];
                newSvgs[targetIndex].transform = `rotate(${angle} ${start.x} ${start.y})`;
                newSvgs[targetIndex].x = start.x! - newSvgs[targetIndex].width! / 2;
                newSvgs[targetIndex].y = start.y! - newSvgs[targetIndex].height! / 2;
                /* avoid visual delay, fix this if encounter performance issue */
                setTransformNode(
                    <RectTransformNode
                        finalSvg={finalSvg}
                        rectIndex={targetIndex}
                        rotate={finalSvg[targetIndex].transform!}
                    />
                );
                return newSvgs;
            });
        }
        if (Object.prototype.hasOwnProperty.call(start, "eventType")) {
            setTransformNode(
                <RectTransformNode
                    finalSvg={finalSvg}
                    rectIndex={targetIndex}
                    rotate={finalSvg[targetIndex].transform!}
                />
            );
        }
    } else if (targetIndex !== -1 && finalSvg[targetIndex].tag === "ellipse") {
        if (start.eventType === "height") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevEllipse = [...prevSvg];
                prevEllipse[targetIndex].cy = (mouseY + start.y!) / 2;
                prevEllipse[targetIndex].ry = Math.abs((mouseY - start.y!) / 2);
                return prevEllipse;
            });
        } else if (start.eventType === "width") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevEllipse = [...prevSvg];
                prevEllipse[targetIndex].cx = (mouseX + start.x!) / 2;
                prevEllipse[targetIndex].rx = Math.abs((mouseX - start.x!) / 2);
                return prevEllipse;
            });
        } else if (start.eventType === "corner") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevEllipse = [...prevSvg];
                prevEllipse[targetIndex].cx = (mouseX + start.x!) / 2;
                prevEllipse[targetIndex].cy = (mouseY + start.y!) / 2;
                prevEllipse[targetIndex].rx = Math.abs((mouseX - start.x!) / 2);
                prevEllipse[targetIndex].ry = Math.abs((mouseY - start.y!) / 2);
                return prevEllipse;
            });
        } else if (start.eventType === "drag") {
            setFinalSvg((prevSvg: FinalSvg) => {
                const prevEllipse = [...prevSvg];
                prevEllipse[targetIndex].cx! = e.nativeEvent.offsetX - start.x!;
                prevEllipse[targetIndex].cy! = e.nativeEvent.offsetY - start.y!;
                if (prevEllipse[targetIndex].transform) {
                    prevEllipse[targetIndex].transform = `rotate(${
                        prevEllipse[targetIndex].transform?.split("(")[1].split(" ")[0]
                    } ${e.nativeEvent.offsetX - start.rotateX!} ${
                        e.nativeEvent.offsetY - start.rotateY!
                    })`;
                }
                /* avoid visual delay, fix this if encounter performance issue */
                setTransformNode(
                    <EllipseTransformNode
                        finalSvg={finalSvg}
                        ellipseIndex={targetIndex}
                        rotate={finalSvg[targetIndex].transform!}
                    />
                );
                return prevEllipse;
            });
        } else if (start.eventType === "rotate") {
            const angle = (
                Math.atan2(e.nativeEvent.offsetY - start.y!, e.nativeEvent.offsetX - start.x!) *
                    (180 / Math.PI) +
                90
            ).toFixed(1);
            setFinalSvg((prevSvgs) => {
                const newSvgs = [...prevSvgs];
                newSvgs[targetIndex].transform = `rotate(${angle} ${start.x} ${start.y})`;
                newSvgs[targetIndex].cx = start.x;
                newSvgs[targetIndex].cy = start.y;
                /* avoid visual delay, fix this if encounter performance issue */
                setTransformNode(
                    <EllipseTransformNode
                        finalSvg={finalSvg}
                        ellipseIndex={targetIndex}
                        rotate={finalSvg[targetIndex].transform!}
                    />
                );
                return newSvgs;
            });
        }
        if (Object.prototype.hasOwnProperty.call(start, "eventType")) {
            setTransformNode(
                <EllipseTransformNode
                    finalSvg={finalSvg}
                    ellipseIndex={targetIndex}
                    rotate={finalSvg[targetIndex].transform!}
                />
            );
        }
    }
};

export default handleTransform;
