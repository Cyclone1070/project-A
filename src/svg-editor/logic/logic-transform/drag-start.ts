/* code extraction from use-transform */

import { FinalSvg } from "../../types";
import { rect, ellipse } from "svg-boundings";

export function dragStart(
    e: React.MouseEvent,
    finalSvg: FinalSvg,
    tempIndex: number,
    targetIndex: number,
    setStart: React.Dispatch<
        React.SetStateAction<{
            x?: number;
            y?: number;
            eventType?: string;
            rotateX?: number;
            rotateY?: number;
        }>
    >,
    canvasRef: React.MutableRefObject<SVGSVGElement>
) {
    let index = -1;
    if (tempIndex !== -1) {
        index = tempIndex;
    } else {
        index = targetIndex;
    }
    if ((e.target as HTMLElement).classList.contains("rect-transform-node")) {
        if ((e.target as HTMLElement).id === "top") {
            setStart({
                y: finalSvg[index].y! + finalSvg[index].height!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "bottom") {
            setStart({
                y: finalSvg[index].y,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "left") {
            setStart({
                x: finalSvg[index].x! + finalSvg[index].width!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "right") {
            setStart({
                x: finalSvg[index].x,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "top-left") {
            setStart({
                x: finalSvg[index].x! + finalSvg[index].width!,
                y: finalSvg[index].y! + finalSvg[index].height!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "top-right") {
            setStart({
                x: finalSvg[index].x,
                y: finalSvg[index].y! + finalSvg[index].height!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-left") {
            setStart({
                x: finalSvg[index].x! + finalSvg[index].width!,
                y: finalSvg[index].y,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-right") {
            setStart({
                x: finalSvg[index].x,
                y: finalSvg[index].y,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "rotate") {
            setStart(() => {
                let bBox = null;
                for (let i = 0; i < canvasRef.current.children.length; i++) {
                    if (finalSvg[targetIndex].id === canvasRef.current.children[i].id) {
                        bBox = rect(canvasRef.current.children[i]);
                    }
                }
                return {
                    eventType: "rotate",
                    x: bBox!.left + bBox!.width / 2,
                    y: bBox!.top + bBox!.height / 2,
                };
            });
        }
    } else if ((e.target as HTMLElement).classList.contains("ellipse-transform-node")) {
        if ((e.target as HTMLElement).id === "top") {
            setStart({
                y: finalSvg[index].cy! + finalSvg[index].ry!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "bottom") {
            setStart({
                y: finalSvg[index].cy! - finalSvg[index].ry!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "left") {
            setStart({
                x: finalSvg[index].cx! + finalSvg[index].rx!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "right") {
            setStart({
                x: finalSvg[index].cx! - finalSvg[index].rx!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "top-left") {
            setStart({
                x: finalSvg[index].cx! + finalSvg[index].rx!,
                y: finalSvg[index].cy! + finalSvg[index].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "top-right") {
            setStart({
                x: finalSvg[index].cx! - finalSvg[index].rx!,
                y: finalSvg[index].cy! + finalSvg[index].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-left") {
            setStart({
                x: finalSvg[index].cx! + finalSvg[index].rx!,
                y: finalSvg[index].cy! - finalSvg[index].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-right") {
            setStart({
                x: finalSvg[index].cx! - finalSvg[index].rx!,
                y: finalSvg[index].cy! - finalSvg[index].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "rotate") {
            setStart(() => {
                let bBox = null;
                for (let i = 0; i < canvasRef.current.children.length; i++) {
                    if (finalSvg[targetIndex].id === canvasRef.current.children[i].id) {
                        bBox = ellipse(canvasRef.current.children[i], true);
                    }
                }
                return {
                    eventType: "rotate",
                    x: bBox!.left + bBox!.width / 2,
                    y: bBox!.top + bBox!.height / 2,
                };
            });
        }
    } else if (
        (finalSvg[index] &&
            (e.target as HTMLElement).id === finalSvg[index].id &&
            (e.target as HTMLElement).tagName === "rect") ||
        (e.target as HTMLElement).classList.contains("rect-cross")
    ) {
        let distanceToRotateCenter = {};
        if (Object.prototype.hasOwnProperty.call(finalSvg[index], "transform")) {
            distanceToRotateCenter = {
                rotateX:
                    e.nativeEvent.offsetX - +finalSvg[index].transform!.split("(")[1].split(" ")[1],
                rotateY:
                    e.nativeEvent.offsetY -
                    +finalSvg[index].transform!.split("(")[1].split(" ")[2].split(")")[0],
            };
        }
        setStart({
            x: e.nativeEvent.offsetX - finalSvg[index].x!,
            y: e.nativeEvent.offsetY - finalSvg[index].y!,
            eventType: "drag",
            ...distanceToRotateCenter,
        });
    } else if (
        (finalSvg[index] &&
            (e.target as HTMLElement).id === finalSvg[index].id &&
            (e.target as HTMLElement).tagName === "ellipse") ||
        (e.target as HTMLElement).classList.contains("ellipse-cross")
    ) {
        let distanceToRotateCenter = {};
        if (Object.prototype.hasOwnProperty.call(finalSvg[index], "transform")) {
            distanceToRotateCenter = {
                rotateX:
                    e.nativeEvent.offsetX - +finalSvg[index].transform!.split("(")[1].split(" ")[1],
                rotateY:
                    e.nativeEvent.offsetY -
                    +finalSvg[index].transform!.split("(")[1].split(" ")[2].split(")")[0],
            };
        }
        setStart({
            x: e.nativeEvent.offsetX - finalSvg[index].cx!,
            y: e.nativeEvent.offsetY - finalSvg[index].cy!,
            eventType: "drag",
            ...distanceToRotateCenter,
        });
    }
}
