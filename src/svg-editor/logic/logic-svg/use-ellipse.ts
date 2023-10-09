import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Ellipse } from "../../types";

const useEllipse = (setFinalSvg: React.Dispatch<React.SetStateAction<object[]>>) => {
    /* when drag */
    const [tempEllipse, setTempEllipse] = useState<Ellipse>({});
    const [isDragging, setIsDragging] = useState(false);
    /* variable for adjusting tempEllipse */
    const [start, setStart] = useState<{ x?: number; y?: number }>({});

    function addTempEllipse(e: React.MouseEvent) {
        setStart({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
        setTempEllipse({
            tag: "ellipse",
            id: uuid(),
            fill: "lightgrey",
            stroke: "black",
            strokeWidth: 1.5,
        });
        setIsDragging(true);
    }

    function adjustTempEllipse(e: React.MouseEvent) {
        if (isDragging) {
            setTempEllipse((prevEllipse) => {
                /* avoiding glichy tempEllipse when event is fired before state update (drag immediately after click) */
                if (start.x && start.y) {
                    return {
                        ...prevEllipse,
                        cx: start.x + (e.nativeEvent.offsetX - start.x) / 2,
                        cy: start.y + (e.nativeEvent.offsetY - start.y) / 2,
                        rx: Math.abs((e.nativeEvent.offsetX - start.x) / 2),
                        ry: Math.abs((e.nativeEvent.offsetY - start.y) / 2),
                    };
                } else {
                    return prevEllipse;
                }
            });
        }
    }

    function finalizeEllipse() {
        if (isDragging) {
            setFinalSvg((prevSvg) => {
                /* check for final visibility */
                if (tempEllipse.rx !== 0 && tempEllipse.ry !== 0) {
                    return [...prevSvg, tempEllipse];
                } else {
                    return prevSvg;
                }
            });
        }
        /* reset */
        setTempEllipse({});
        setIsDragging(false);
        setStart({});
    }

    const ellipseEvent = {
        onMouseDown: addTempEllipse,
        onMouseMove: adjustTempEllipse,
        onMouseUp: finalizeEllipse,
        onMouseLeave: finalizeEllipse,
    };
    return { tempEllipse, ellipseEvent };
};

export default useEllipse;
