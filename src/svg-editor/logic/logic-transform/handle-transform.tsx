import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";

export function handleTransform(
    e: React.MouseEvent,
    isDragging: boolean,
    targetType: string,
    targetIndex: number,
    setTransformNode: React.Dispatch<React.SetStateAction<JSX.Element>>,
    start: { x?: number; y?: number; eventType?: string },
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>
) {
    if (isDragging) {
        if (targetType === "rect") {
            if (start.eventType === "height") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[targetIndex].y = Math.min(e.nativeEvent.offsetY, start.y!);
                    prevRect[targetIndex].height = Math.abs(e.nativeEvent.offsetY - start.y!);
                    return prevRect;
                });
            } else if (start.eventType === "width") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[targetIndex].x = Math.min(e.nativeEvent.offsetX, start.x!);
                    prevRect[targetIndex].width = Math.abs(e.nativeEvent.offsetX - start.x!);
                    return prevRect;
                });
            } else if (start.eventType === "corner") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[targetIndex].x = Math.min(e.nativeEvent.offsetX, start.x!);
                    prevRect[targetIndex].y = Math.min(e.nativeEvent.offsetY, start.y!);
                    prevRect[targetIndex].width = Math.abs(e.nativeEvent.offsetX - start.x!);
                    prevRect[targetIndex].height = Math.abs(e.nativeEvent.offsetY - start.y!);
                    return prevRect;
                });
            } else if (start.eventType === "drag") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevRect = [...prevSvg];
                    prevRect[targetIndex].x! = e.nativeEvent.offsetX - start.x!;
                    prevRect[targetIndex].y! = e.nativeEvent.offsetY - start.y!;
                    return prevRect;
                });
            }
            setTransformNode(<RectTransformNode finalSvg={finalSvg} rectIndex={targetIndex} />);
        } else if (targetType === "ellipse") {
            if (start.eventType === "height") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevEllipse = [...prevSvg];
                    prevEllipse[targetIndex].cy = (e.nativeEvent.offsetY + start.y!) / 2;
                    prevEllipse[targetIndex].ry = Math.abs((e.nativeEvent.offsetY - start.y!) / 2);
                    return prevEllipse;
                });
            } else if (start.eventType === "width") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevEllipse = [...prevSvg];
                    prevEllipse[targetIndex].cx = (e.nativeEvent.offsetX + start.x!) / 2;
                    prevEllipse[targetIndex].rx = Math.abs((e.nativeEvent.offsetX - start.x!) / 2);
                    return prevEllipse;
                });
            } else if (start.eventType === "corner") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevEllipse = [...prevSvg];
                    prevEllipse[targetIndex].cx = (e.nativeEvent.offsetX + start.x!) / 2;
                    prevEllipse[targetIndex].cy = (e.nativeEvent.offsetY + start.y!) / 2;
                    prevEllipse[targetIndex].rx = Math.abs((e.nativeEvent.offsetX - start.x!) / 2);
                    prevEllipse[targetIndex].ry = Math.abs((e.nativeEvent.offsetY - start.y!) / 2);
                    return prevEllipse;
                });
            } else if (start.eventType === "drag") {
                setFinalSvg((prevSvg: FinalSvg) => {
                    const prevEllipse = [...prevSvg];
                    prevEllipse[targetIndex].cx! = e.nativeEvent.offsetX - start.x!;
                    prevEllipse[targetIndex].cy! = e.nativeEvent.offsetY - start.y!;
                    return prevEllipse;
                });
            }
            setTransformNode(
                <EllipseTransformNode finalSvg={finalSvg} ellipseIndex={targetIndex} />
            );
        }
    }
}
