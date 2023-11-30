/* logic behind path */
import { FinalSvg, Path } from "../../types";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const usePath = (setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempPath, setTempPath] = useState<Path>({});
    const [prevSection, setPrevSection] = useState<string>("");

    function addPoint(e: React.MouseEvent) {
        if (isDrawing) {
            setPrevSection((prev) => {
                return prev + " " + `L ${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`;
            });
        } else {
            setIsDrawing(true);
            setPrevSection(`M ${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`);
            setTempPath({
                fill: "lightgrey",
                stroke: "black",
                strokeWidth: 1.5,
            });
        }
    }
    function adjustPreview(e: React.MouseEvent) {
        if (isDrawing) {
            setTempPath((prev) => {
                return {
                    ...prev,
                    d: `${prevSection} L ${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`,
                };
            });
        }
    }
    function finalizePath() {
        /* check for final visibility */
        if (tempPath.d?.includes("L") || tempPath.d?.includes("C")) {
            setFinalSvg((prev) => {
                return [...prev, tempPath];
            });
        }
        setIsDrawing(false);
        setTempPath({});
        setPrevSection("");
    }

    const pathEvent = {
        onMouseDown: addPoint,
        onMouseMove: adjustPreview,
        onMouseLeave: finalizePath,
    };
    return { tempPath, pathEvent };
};

export default usePath;
