import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import { useEffect, useRef, useState } from "react";

const useTransform = (
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<object[]>>,
    drawMode: string
) => {
    const isDragging = useRef(false);
    const stopClickEvent = useRef(false); /* onClick trigger when drag by default */
    const rectIndex = useRef(-1);
    const [start, setStart] = useState<{ x?: number; y?: number; nodeType?: string }>({});
    const [transformNode, setTransformNode] = useState(<></>);

    /* choosing target */
    function chooseTarget(e: React.MouseEvent) {
        if (!stopClickEvent.current) {
            if (
                (e.target as HTMLElement).tagName === "rect" &&
                /* check for transform node */
                !(e.target as HTMLElement).classList.contains("rect-transform-node")
            ) {
                rectIndex.current = finalSvg.findIndex(
                    (rect) => rect.id === (e.target as HTMLElement).id
                );
                setTransformNode(
                    <RectTransformNode finalSvg={finalSvg} rectIndex={rectIndex.current} />
                );
            } else if ((e.target as HTMLElement).tagName === "svg") {
                setTransformNode(<></>);
            }
        }
    }
    /* handle rect resize event */
    function dragStart(e: React.MouseEvent) {
        stopClickEvent.current = false;
        if ((e.target as HTMLElement).classList.contains("rect-transform-node")) {
            isDragging.current = true;
            if ((e.target as HTMLElement).id === "top") {
                setStart({
                    y: finalSvg[rectIndex.current].y! + finalSvg[rectIndex.current].height!,
                    nodeType: "height",
                });
            } else if ((e.target as HTMLElement).id === "bottom") {
                setStart({
                    y: finalSvg[rectIndex.current].y!,
                    nodeType: "height",
                });
            } else if ((e.target as HTMLElement).id === "left") {
                setStart({
                    x: finalSvg[rectIndex.current].x! + finalSvg[rectIndex.current].width!,
                    nodeType: "width",
                });
            } else if ((e.target as HTMLElement).id === "right") {
                setStart({
                    x: finalSvg[rectIndex.current].x!,
                    nodeType: "width",
                });
            } else if ((e.target as HTMLElement).id === "top-left") {
                setStart({
                    x: finalSvg[rectIndex.current].x! + finalSvg[rectIndex.current].width!,
                    y: finalSvg[rectIndex.current].y! + finalSvg[rectIndex.current].height!,
                    nodeType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "top-right") {
                setStart({
                    x: finalSvg[rectIndex.current].x!,
                    y: finalSvg[rectIndex.current].y! + finalSvg[rectIndex.current].height!,
                    nodeType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-left") {
                setStart({
                    x: finalSvg[rectIndex.current].x! + finalSvg[rectIndex.current].width!,
                    y: finalSvg[rectIndex.current].y!,
                    nodeType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-right") {
                setStart({
                    x: finalSvg[rectIndex.current].x!,
                    y: finalSvg[rectIndex.current].y!,
                    nodeType: "corner",
                });
            }
        } else if (
            finalSvg[rectIndex.current] &&
            (e.target as HTMLElement).id === finalSvg[rectIndex.current].id
        ) {
            isDragging.current = true;
            setStart({
                x: e.nativeEvent.offsetX - finalSvg[rectIndex.current].x!,
                y: e.nativeEvent.offsetY - finalSvg[rectIndex.current].y!,
                nodeType: "drag",
            });
        }
    }
    function handleResize(e: React.MouseEvent) {
        stopClickEvent.current = true;
        if (isDragging.current) {
            if (start.nodeType === "height") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[rectIndex.current].y = Math.min(e.nativeEvent.offsetY, start.y!);
                    prevRect[rectIndex.current].height = Math.abs(e.nativeEvent.offsetY - start.y!);
                    return prevRect;
                });
            } else if (start.nodeType === "width") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[rectIndex.current].x = Math.min(e.nativeEvent.offsetX, start.x!);
                    prevRect[rectIndex.current].width = Math.abs(e.nativeEvent.offsetX - start.x!);
                    return prevRect;
                });
            } else if (start.nodeType === "corner") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[rectIndex.current].x = Math.min(e.nativeEvent.offsetX, start.x!);
                    prevRect[rectIndex.current].y = Math.min(e.nativeEvent.offsetY, start.y!);
                    prevRect[rectIndex.current].height = Math.abs(e.nativeEvent.offsetY - start.y!);
                    prevRect[rectIndex.current].width = Math.abs(e.nativeEvent.offsetX - start.x!);
                    return prevRect;
                });
            } else if (start.nodeType === "drag") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[rectIndex.current].x! = e.nativeEvent.offsetX - start.x!;
                    prevRect[rectIndex.current].y! = e.nativeEvent.offsetY - start.y!;
                    return prevRect;
                });
            }
            setTransformNode(
                <RectTransformNode finalSvg={finalSvg} rectIndex={rectIndex.current} />
            );
        }
    }
    function dragEnd() {
        isDragging.current = false;
        setStart({});
    }

    const transformEvent = {
        onClick: chooseTarget,
        onMouseDown: dragStart,
        onMouseMove: handleResize,
        onMouseUp: dragEnd,
    };
    useEffect(() => {
        if (drawMode !== "transform") {
            setTransformNode(<></>);
        }
    }, [drawMode]);
    return { transformEvent, transformNode };
};

export default useTransform;
