/* code extraction from use-transform */

import { FinalSvg } from "../../types";

const handleKeyDown = (
    e: KeyboardEvent,
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    targetIndex: number,
    setTargetIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    if (targetIndex !== -1) {
        if (e.key === "]") {
            if (targetIndex < finalSvg.length - 1) {
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    [holderSvgs[targetIndex], holderSvgs[targetIndex + 1]] = [
                        holderSvgs[targetIndex + 1],
                        holderSvgs[targetIndex],
                    ];
                    return holderSvgs;
                });
                setTargetIndex((prev) => prev + 1);
            }
        } else if (e.key === "[") {
            if (targetIndex > 0) {
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    [holderSvgs[targetIndex], holderSvgs[targetIndex - 1]] = [
                        holderSvgs[targetIndex - 1],
                        holderSvgs[targetIndex],
                    ];
                    return holderSvgs;
                });
                setTargetIndex((prev) => prev - 1);
            }
        } else if (e.key === "}") {
            if (targetIndex < finalSvg.length - 1) {
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    const targetSvg = holderSvgs.splice(targetIndex, 1);
                    holderSvgs.push(targetSvg[0]);
                    return holderSvgs;
                });
                setTargetIndex(finalSvg.length - 1);
            }
        } else if (e.key === "{") {
            if (targetIndex > 0) {
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    const targetSvg = holderSvgs.splice(targetIndex, 1);
                    holderSvgs.unshift(targetSvg[0]);
                    return holderSvgs;
                });
                setTargetIndex(0);
            }
        }
    }
};

export default handleKeyDown;
