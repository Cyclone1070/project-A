/* logic behind rect */
import { FinalSvg, Rect } from "../../types";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const useRect = (setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>) => {
    /* when drag */
    const [tempRect, setTempRect] = useState<Rect>({});
    const [isDragging, setIsDragging] = useState(false);
    /* variable for adjusting tempRect */
    const [start, setStart] = useState<{ x?: number; y?: number }>({});

    function addTempRect(e: React.MouseEvent) {
        setStart({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
        setTempRect({
            tag: "rect",
            id: uuid(),
            fill: "lightgrey",
            stroke: "black",
            strokeWidth: 1.5,
        });
        setIsDragging(true);
    }

    function adjustTempRect(e: React.MouseEvent) {
        if (isDragging) {
            setTempRect((prevRect) => {
                /* avoiding glichy tempRect when event is fired before state update (drag immediately after click) */
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
    }

    function finalizeRect() {
        if (isDragging) {
            /* check for final visibility */
            if (
                tempRect.width &&
                tempRect.height &&
                tempRect.width !== 0 &&
                tempRect.height !== 0
            ) {
                setFinalSvg((prevSvg) => {
                    return [...prevSvg, tempRect];
                });
            }
        }
        /* reset */
        setTempRect({});
        setIsDragging(false);
        setStart({});
    }

    const rectEvent = {
        onMouseDown: addTempRect,
        onMouseMove: adjustTempRect,
        onMouseUp: finalizeRect,
        onMouseLeave: finalizeRect,
    };
    return { tempRect, rectEvent };
};

export default useRect;
