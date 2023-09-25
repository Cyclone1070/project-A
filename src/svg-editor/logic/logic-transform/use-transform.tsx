import { FinalSvg } from "../../types";
import RectTransformNode from "./transform-nodes/rect-transforn-node";
import EllipseTransformNode from "./transform-nodes/ellipse-transform-node";
import { dragStart } from "./drag-start";
import { handleTransform } from "./handle-transform";
import { handleKeyDown } from "./keyboardShorcut";
import { useEffect, useRef, useState } from "react";

const useTransform = (
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    drawMode: string
) => {
    const isDragging = useRef(false);
    const targetType = useRef("");
    const targetIndex = useRef(-1);
    const [start, setStart] = useState<{ x?: number; y?: number; eventType?: string }>({});
    const [transformNode, setTransformNode] = useState(<></>);

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
            targetIndex.current = -1;
        }
    }
    function dragEnd() {
        isDragging.current = false;
        setStart({});
    }

    const transformEvent = {
        onMouseDown: (e: React.MouseEvent) => {
            chooseTarget(e);
            dragStart(e, finalSvg, targetIndex.current, isDragging, setStart);
        },
        onMouseMove: (e: React.MouseEvent) => {
            handleTransform(
                e,
                isDragging.current,
                targetType.current,
                targetIndex.current,
                setTransformNode,
                start,
                finalSvg,
                setFinalSvg
            );
        },
        onMouseUp: dragEnd,
        onMouseLeave: dragEnd,
    };

    useEffect(() => {
        /* remove transform nodes on switching draw mode */
        if (drawMode !== "transform") {
            setTransformNode(<></>);
            targetIndex.current = -1;
        }
        /* keyboard shorcuts */
        const handleEvent = (e: KeyboardEvent) => {
            handleKeyDown(e, finalSvg, setFinalSvg, targetIndex);
        };
        window.addEventListener("keydown", handleEvent);
        return () => {
            window.removeEventListener("keydown", handleEvent);
        };
    }, [drawMode, setFinalSvg, finalSvg]);
    return { transformEvent, transformNode };
};

export default useTransform;
