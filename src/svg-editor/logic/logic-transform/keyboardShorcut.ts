import { FinalSvg } from "../../types";

export const handleKeyDown = (
    e: KeyboardEvent,
    finalSvg: FinalSvg,
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>,
    targetIndex: React.MutableRefObject<number>
) => {
    if (targetIndex.current !== -1) {
        if (e.key === "[") {
            if (targetIndex.current < finalSvg.length - 1) {
                targetIndex.current += 1;
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    [holderSvgs[targetIndex.current], holderSvgs[targetIndex.current - 1]] = [
                        holderSvgs[targetIndex.current - 1],
                        holderSvgs[targetIndex.current],
                    ];
                    return holderSvgs;
                });
            }
        } else if (e.key === "]") {
            if (targetIndex.current > 0) {
                targetIndex.current -= 1;
                setFinalSvg((prevSvgs) => {
                    const holderSvgs = [...prevSvgs];
                    [holderSvgs[targetIndex.current], holderSvgs[targetIndex.current + 1]] = [
                        holderSvgs[targetIndex.current + 1],
                        holderSvgs[targetIndex.current],
                    ];
                    return holderSvgs;
                });
            }
        }
    }
};
