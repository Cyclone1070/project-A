import { FinalSvg } from "../../types";

export function dragStart(
    e: React.MouseEvent,
    finalSvg: FinalSvg,
    targetIndex: number,
    isDragging: React.MutableRefObject<boolean>,
    setStart: React.Dispatch<
        React.SetStateAction<{
            x?: number;
            y?: number;
            eventType?: string;
        }>
    >
) {
    /* set start info */
    if ((e.target as HTMLElement).classList.contains("rect-transform-node")) {
        isDragging.current = true;
        if ((e.target as HTMLElement).id === "top") {
            setStart({
                y: finalSvg[targetIndex].y! + finalSvg[targetIndex].height!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "bottom") {
            setStart({
                y: finalSvg[targetIndex].y,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "left") {
            setStart({
                x: finalSvg[targetIndex].x! + finalSvg[targetIndex].width!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "right") {
            setStart({
                x: finalSvg[targetIndex].x,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "top-left") {
            setStart({
                x: finalSvg[targetIndex].x! + finalSvg[targetIndex].width!,
                y: finalSvg[targetIndex].y! + finalSvg[targetIndex].height!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "top-right") {
            setStart({
                x: finalSvg[targetIndex].x,
                y: finalSvg[targetIndex].y! + finalSvg[targetIndex].height!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-left") {
            setStart({
                x: finalSvg[targetIndex].x! + finalSvg[targetIndex].width!,
                y: finalSvg[targetIndex].y,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-right") {
            setStart({
                x: finalSvg[targetIndex].x,
                y: finalSvg[targetIndex].y,
                eventType: "corner",
            });
        }
    } else if ((e.target as HTMLElement).classList.contains("ellipse-transform-node")) {
        isDragging.current = true;
        if ((e.target as HTMLElement).id === "top") {
            setStart({
                y: finalSvg[targetIndex].cy! + finalSvg[targetIndex].ry!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "bottom") {
            setStart({
                y: finalSvg[targetIndex].cy! - finalSvg[targetIndex].ry!,
                eventType: "height",
            });
        } else if ((e.target as HTMLElement).id === "left") {
            setStart({
                x: finalSvg[targetIndex].cx! + finalSvg[targetIndex].rx!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "right") {
            setStart({
                x: finalSvg[targetIndex].cx! - finalSvg[targetIndex].rx!,
                eventType: "width",
            });
        } else if ((e.target as HTMLElement).id === "top-left") {
            setStart({
                x: finalSvg[targetIndex].cx! + finalSvg[targetIndex].rx!,
                y: finalSvg[targetIndex].cy! + finalSvg[targetIndex].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "top-right") {
            setStart({
                x: finalSvg[targetIndex].cx! - finalSvg[targetIndex].rx!,
                y: finalSvg[targetIndex].cy! + finalSvg[targetIndex].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-left") {
            setStart({
                x: finalSvg[targetIndex].cx! + finalSvg[targetIndex].rx!,
                y: finalSvg[targetIndex].cy! - finalSvg[targetIndex].ry!,
                eventType: "corner",
            });
        } else if ((e.target as HTMLElement).id === "bottom-right") {
            setStart({
                x: finalSvg[targetIndex].cx! - finalSvg[targetIndex].rx!,
                y: finalSvg[targetIndex].cy! - finalSvg[targetIndex].ry!,
                eventType: "corner",
            });
        }
    } else if (
        (finalSvg[targetIndex] &&
            (e.target as HTMLElement).id === finalSvg[targetIndex].id &&
            (e.target as HTMLElement).tagName === "rect") ||
        (e.target as HTMLElement).classList.contains("rect-cross")
    ) {
        isDragging.current = true;
        setStart({
            x: e.nativeEvent.offsetX - finalSvg[targetIndex].x!,
            y: e.nativeEvent.offsetY - finalSvg[targetIndex].y!,
            eventType: "drag",
        });
    } else if (
        (finalSvg[targetIndex] &&
            (e.target as HTMLElement).id === finalSvg[targetIndex].id &&
            (e.target as HTMLElement).tagName === "ellipse") ||
        (e.target as HTMLElement).classList.contains("ellipse-cross")
    ) {
        isDragging.current = true;
        setStart({
            x: e.nativeEvent.offsetX - finalSvg[targetIndex].cx!,
            y: e.nativeEvent.offsetY - finalSvg[targetIndex].cy!,
            eventType: "drag",
        });
    }
}
