/* code extraction from use-transform */

import { FinalSvg } from "../../types";

const handleKeyDown = (
    e: KeyboardEvent,
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    targetIndex: number,
    setTargetIndex: React.Dispatch<React.SetStateAction<number>>,
    multiTargetIndex: number[],
    setMultiTargetIndex: React.Dispatch<React.SetStateAction<number[]>>,
    setMultiTransformInfo: React.Dispatch<React.SetStateAction<FinalSvg>>
) => {
    if (targetIndex !== -1) {
        if (e.key === "]") {
            if (targetIndex < finalSvg.length - 1) {
                setFinalSvg((prevSvgs) => {
                    const newSvg = [...prevSvgs];
                    [newSvg[targetIndex], newSvg[targetIndex + 1]] = [
                        newSvg[targetIndex + 1],
                        newSvg[targetIndex],
                    ];
                    return newSvg;
                });
                setTargetIndex((prev) => prev + 1);
            }
        } else if (e.key === "[") {
            if (targetIndex > 0) {
                setFinalSvg((prevSvgs) => {
                    const newSvg = [...prevSvgs];
                    [newSvg[targetIndex], newSvg[targetIndex - 1]] = [
                        newSvg[targetIndex - 1],
                        newSvg[targetIndex],
                    ];
                    return newSvg;
                });
                setTargetIndex((prev) => prev - 1);
            }
        } else if (e.key === "}") {
            if (targetIndex < finalSvg.length - 1) {
                setFinalSvg((prevSvgs) => {
                    const newSvg = [...prevSvgs];
                    const targetSvg = newSvg.splice(targetIndex, 1);
                    newSvg.push(targetSvg[0]);
                    return newSvg;
                });
                setTargetIndex(finalSvg.length - 1);
            }
        } else if (e.key === "{") {
            if (targetIndex > 0) {
                setFinalSvg((prevSvgs) => {
                    const newSvg = [...prevSvgs];
                    const targetSvg = newSvg.splice(targetIndex, 1);
                    newSvg.unshift(targetSvg[0]);
                    return newSvg;
                });
                setTargetIndex(0);
            }
        } else if (e.key === "Backspace" || e.key === "Delete") {
            setFinalSvg((prev) => {
                const newSvg = [...prev];
                newSvg.splice(targetIndex, 1);
                return newSvg;
            });
            setTargetIndex(-1);
        }
    } else if (multiTargetIndex.length !== 0) {
        if (e.key === "]") {
            setFinalSvg((prevSvgs) => {
                const newSvg = [...prevSvgs];
                const tempSvg: FinalSvg = [];
                const sortedIndex = [...multiTargetIndex];

                sortedIndex.sort((a, b) => a - b);
                sortedIndex.forEach((index) => {
                    tempSvg.push(newSvg[index]);
                });
                sortedIndex.sort((a, b) => b - a);
                sortedIndex.forEach((index) => {
                    newSvg.splice(index, 1)[0];
                });
                newSvg.push(...tempSvg);
                return newSvg;
            });
            setMultiTargetIndex((prev) => {
                return prev.map((_index, i) => finalSvg.length - prev.length + i);
            });
            setMultiTransformInfo((prev) => {
                return prev.map((info, i) => {
                    return { ...info, index: finalSvg.length - multiTargetIndex.length + i };
                });
            });
        } else if (e.key === "[") {
            setFinalSvg((prevSvgs) => {
                const newSvg = [...prevSvgs];
                const tempSvg: FinalSvg = [];
                const sortedIndex = [...multiTargetIndex];

                sortedIndex.sort((a, b) => a - b);
                sortedIndex.forEach((index) => {
                    tempSvg.push(newSvg[index]);
                });
                sortedIndex.sort((a, b) => b - a);
                sortedIndex.forEach((index) => {
                    newSvg.splice(index, 1)[0];
                });
                newSvg.unshift(...tempSvg);
                return newSvg;
            });
            setMultiTargetIndex((prev) => {
                return prev.map((_index, i) => i);
            });
            setMultiTransformInfo((prev) => {
                return prev.map((info, i) => {
                    return { ...info, index: i };
                });
            });
        } else if (e.key === "Backspace" || e.key === "Delete") {
            setFinalSvg((prev) => {
                const newSvg = [...prev];
                const sortedIndex = multiTargetIndex.sort((a, b) => b - a);
                sortedIndex.forEach((index) => {
                    newSvg.splice(index, 1);
                });
                return newSvg;
            });
            setMultiTargetIndex([]);
            setMultiTransformInfo([]);
        }
    }
};

export default handleKeyDown;
