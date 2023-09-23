import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";
import { useEffect, useRef, useState } from "react";

const useTransform = (
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<object[]>>,
    drawMode: string
) => {
    const isDragging = useRef(false);
    const targetType = useRef("");
    const targetIndex = useRef(-1);
    const [start, setStart] = useState<{ x?: number; y?: number; eventType?: string }>({});
    const [transformNode, setTransformNode] = useState(<></>);

    /* choosing target */
    function chooseTarget(e: React.MouseEvent) {
        if (
            (e.target as HTMLElement).tagName === "rect" &&
            !(e.target as HTMLElement).classList.contains("transform-node")
        ) {
            targetType.current = "rect";
            targetIndex.current = finalSvg.findIndex(
                (rect) => rect.id === (e.target as HTMLElement).id
            );
            setTransformNode(
                <RectTransformNode finalSvg={finalSvg} rectIndex={targetIndex.current} />
            );
        } else if (
            (e.target as HTMLElement).tagName === "ellipse" &&
            !(e.target as HTMLElement).classList.contains("transform-node")
        ) {
            targetType.current = "ellipse";
            targetIndex.current = finalSvg.findIndex(
                (ellipse) => ellipse.id === (e.target as HTMLElement).id
            );
            setTransformNode(
                <EllipseTransformNode finalSvg={finalSvg} ellipseIndex={targetIndex.current} />
            );
        } else if ((e.target as HTMLElement).tagName === "svg") {
            setTransformNode(<></>);
        }
    }
    /* handle events */
    function dragStart(e: React.MouseEvent) {
        chooseTarget(e);
        /* set start info */
        if ((e.target as HTMLElement).classList.contains("rect-transform-node")) {
            isDragging.current = true;
            if ((e.target as HTMLElement).id === "top") {
                setStart({
                    y: finalSvg[targetIndex.current].y! + finalSvg[targetIndex.current].height!,
                    eventType: "height",
                });
            } else if ((e.target as HTMLElement).id === "bottom") {
                setStart({
                    y: finalSvg[targetIndex.current].y,
                    eventType: "height",
                });
            } else if ((e.target as HTMLElement).id === "left") {
                setStart({
                    x: finalSvg[targetIndex.current].x! + finalSvg[targetIndex.current].width!,
                    eventType: "width",
                });
            } else if ((e.target as HTMLElement).id === "right") {
                setStart({
                    x: finalSvg[targetIndex.current].x,
                    eventType: "width",
                });
            } else if ((e.target as HTMLElement).id === "top-left") {
                setStart({
                    x: finalSvg[targetIndex.current].x! + finalSvg[targetIndex.current].width!,
                    y: finalSvg[targetIndex.current].y! + finalSvg[targetIndex.current].height!,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "top-right") {
                setStart({
                    x: finalSvg[targetIndex.current].x,
                    y: finalSvg[targetIndex.current].y! + finalSvg[targetIndex.current].height!,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-left") {
                setStart({
                    x: finalSvg[targetIndex.current].x! + finalSvg[targetIndex.current].width!,
                    y: finalSvg[targetIndex.current].y,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-right") {
                setStart({
                    x: finalSvg[targetIndex.current].x,
                    y: finalSvg[targetIndex.current].y,
                    eventType: "corner",
                });
            }
        } else if ((e.target as HTMLElement).classList.contains("ellipse-transform-node")) {
            isDragging.current = true;
            if ((e.target as HTMLElement).id === "top") {
                setStart({
                    y: finalSvg[targetIndex.current].cy! + finalSvg[targetIndex.current].ry!,
                    eventType: "height",
                });
            } else if ((e.target as HTMLElement).id === "bottom") {
                setStart({
                    y: finalSvg[targetIndex.current].cy! - finalSvg[targetIndex.current].ry!,
                    eventType: "height",
                });
            } else if ((e.target as HTMLElement).id === "left") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! + finalSvg[targetIndex.current].rx!,
                    eventType: "width",
                });
            } else if ((e.target as HTMLElement).id === "right") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! - finalSvg[targetIndex.current].rx!,
                    eventType: "width",
                });
            } else if ((e.target as HTMLElement).id === "top-left") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! + finalSvg[targetIndex.current].rx!,
                    y: finalSvg[targetIndex.current].cy! + finalSvg[targetIndex.current].ry!,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "top-right") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! - finalSvg[targetIndex.current].rx!,
                    y: finalSvg[targetIndex.current].cy! + finalSvg[targetIndex.current].ry!,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-left") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! + finalSvg[targetIndex.current].rx!,
                    y: finalSvg[targetIndex.current].cy! - finalSvg[targetIndex.current].ry!,
                    eventType: "corner",
                });
            } else if ((e.target as HTMLElement).id === "bottom-right") {
                setStart({
                    x: finalSvg[targetIndex.current].cx! - finalSvg[targetIndex.current].rx!,
                    y: finalSvg[targetIndex.current].cy! - finalSvg[targetIndex.current].ry!,
                    eventType: "corner",
                });
            }
        } else if (
            finalSvg[targetIndex.current] &&
            (e.target as HTMLElement).id === finalSvg[targetIndex.current].id &&
            (e.target as HTMLElement).tagName === "rect"
        ) {
            isDragging.current = true;
            setStart({
                x: e.nativeEvent.offsetX - finalSvg[targetIndex.current].x!,
                y: e.nativeEvent.offsetY - finalSvg[targetIndex.current].y!,
                eventType: "drag",
            });
        } else if (
            finalSvg[targetIndex.current] &&
            (e.target as HTMLElement).id === finalSvg[targetIndex.current].id &&
            (e.target as HTMLElement).tagName === "ellipse"
        ) {
            isDragging.current = true;
            setStart({
                x: e.nativeEvent.offsetX - finalSvg[targetIndex.current].cx!,
                y: e.nativeEvent.offsetY - finalSvg[targetIndex.current].cy!,
                eventType: "drag",
            });
        }
    }
    function handleResize(e: React.MouseEvent) {
        if (isDragging.current) {
            if (targetType.current === "rect") {
                if (start.eventType === "height") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevRect = [...prevSvg];
                        prevRect[targetIndex.current].y = Math.min(e.nativeEvent.offsetY, start.y!);
                        prevRect[targetIndex.current].height = Math.abs(
                            e.nativeEvent.offsetY - start.y!
                        );
                        return prevRect;
                    });
                } else if (start.eventType === "width") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevRect = [...prevSvg];
                        prevRect[targetIndex.current].x = Math.min(e.nativeEvent.offsetX, start.x!);
                        prevRect[targetIndex.current].width = Math.abs(
                            e.nativeEvent.offsetX - start.x!
                        );
                        return prevRect;
                    });
                } else if (start.eventType === "corner") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevRect = [...prevSvg];
                        prevRect[targetIndex.current].x = Math.min(e.nativeEvent.offsetX, start.x!);
                        prevRect[targetIndex.current].y = Math.min(e.nativeEvent.offsetY, start.y!);
                        prevRect[targetIndex.current].width = Math.abs(
                            e.nativeEvent.offsetX - start.x!
                        );
                        prevRect[targetIndex.current].height = Math.abs(
                            e.nativeEvent.offsetY - start.y!
                        );
                        return prevRect;
                    });
                } else if (start.eventType === "drag") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevRect = [...prevSvg];
                        prevRect[targetIndex.current].x! = e.nativeEvent.offsetX - start.x!;
                        prevRect[targetIndex.current].y! = e.nativeEvent.offsetY - start.y!;
                        return prevRect;
                    });
                }
                setTransformNode(
                    <RectTransformNode finalSvg={finalSvg} rectIndex={targetIndex.current} />
                );
            } else if (targetType.current === "ellipse") {
                if (start.eventType === "height") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevEllipse = [...prevSvg];
                        prevEllipse[targetIndex.current].cy =
                            (e.nativeEvent.offsetY + start.y!) / 2;
                        prevEllipse[targetIndex.current].ry = Math.abs(
                            (e.nativeEvent.offsetY - start.y!) / 2
                        );
                        return prevEllipse;
                    });
                } else if (start.eventType === "width") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevEllipse = [...prevSvg];
                        prevEllipse[targetIndex.current].cx =
                            (e.nativeEvent.offsetX + start.x!) / 2;
                        prevEllipse[targetIndex.current].rx = Math.abs(
                            (e.nativeEvent.offsetX - start.x!) / 2
                        );
                        return prevEllipse;
                    });
                } else if (start.eventType === "corner") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevEllipse = [...prevSvg];
                        prevEllipse[targetIndex.current].cx =
                            (e.nativeEvent.offsetX + start.x!) / 2;
                        prevEllipse[targetIndex.current].cy =
                            (e.nativeEvent.offsetY + start.y!) / 2;
                        prevEllipse[targetIndex.current].rx = Math.abs(
                            (e.nativeEvent.offsetX - start.x!) / 2
                        );
                        prevEllipse[targetIndex.current].ry = Math.abs(
                            (e.nativeEvent.offsetY - start.y!) / 2
                        );
                        return prevEllipse;
                    });
                } else if (start.eventType === "drag") {
                    setFinalSvg((prevSvg: FinalSvg) => {
                        const prevEllipse = [...prevSvg];
                        prevEllipse[targetIndex.current].cx! = e.nativeEvent.offsetX - start.x!;
                        prevEllipse[targetIndex.current].cy! = e.nativeEvent.offsetY - start.y!;
                        return prevEllipse;
                    });
                }
                setTransformNode(
                    <EllipseTransformNode finalSvg={finalSvg} ellipseIndex={targetIndex.current} />
                );
            }
        }
    }
    function dragEnd() {
        isDragging.current = false;
        setStart({});
    }

    const transformEvent = {
        onMouseDown: dragStart,
        onMouseMove: handleResize,
        onMouseUp: dragEnd,
        onMouseLeave: dragEnd,
    };
    /* remove transform nodes on switching draw mode */
    useEffect(() => {
        if (drawMode !== "transform") {
            setTransformNode(<></>);
        }
    }, [drawMode]);
    return { transformEvent, transformNode };
};

export default useTransform;
