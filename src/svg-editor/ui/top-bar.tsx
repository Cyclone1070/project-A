import { FinalSvg } from "../types";
import TopBarInput from "./buttons/top-bar-input";
import { useEffect, useState } from "react";

interface props {
    targetIndex: number;
    finalSvg: FinalSvg;
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>;
    setTransformNode: React.Dispatch<React.SetStateAction<JSX.Element>>;
    canvasRef: React.MutableRefObject<SVGSVGElement>;
}

const TopBar = ({ targetIndex, finalSvg, setFinalSvg, setTransformNode, canvasRef }: props) => {
    const [finalBar, setFinalBar] = useState(<></>);
    useEffect(() => {
        const basicBar = <div className="basic-bar">Logo Undo Redo</div>;
        if (targetIndex !== -1) {
            if (finalSvg[targetIndex].tag === "rect") {
                setFinalBar(
                    <div className="top-bar">
                        {basicBar}
                        <div className="input-group">
                            <TopBarInput
                                name="x"
                                value={finalSvg[targetIndex].x!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="y"
                                value={finalSvg[targetIndex].y!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="width"
                                value={finalSvg[targetIndex].width!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="height"
                                value={finalSvg[targetIndex].height!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            {finalSvg[targetIndex].transform && (
                                <TopBarInput
                                    name="rotate"
                                    value={
                                        +finalSvg[targetIndex]
                                            .transform!.split("(")[1]
                                            .split(" ")[0]
                                    }
                                    targetIndex={targetIndex}
                                    setFinalSvg={setFinalSvg}
                                    setTransformNode={setTransformNode}
                                    canvasRef={canvasRef}
                                />
                            )}
                        </div>
                    </div>
                );
            } else if (finalSvg[targetIndex].tag === "ellipse") {
                setFinalBar(
                    <div className="top-bar">
                        {basicBar}
                        <div className="input-group">
                            <TopBarInput
                                name="cx"
                                value={finalSvg[targetIndex].cx!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="cy"
                                value={finalSvg[targetIndex].cy!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="rx"
                                value={finalSvg[targetIndex].rx!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            <TopBarInput
                                name="ry"
                                value={finalSvg[targetIndex].ry!}
                                targetIndex={targetIndex}
                                setFinalSvg={setFinalSvg}
                                setTransformNode={setTransformNode}
                                canvasRef={canvasRef}
                            />
                            {finalSvg[targetIndex].transform && (
                                <TopBarInput
                                    name="rotate"
                                    value={
                                        +finalSvg[targetIndex]
                                            .transform!.split("(")[1]
                                            .split(" ")[0]
                                    }
                                    targetIndex={targetIndex}
                                    setFinalSvg={setFinalSvg}
                                    setTransformNode={setTransformNode}
                                    canvasRef={canvasRef}
                                />
                            )}
                        </div>
                    </div>
                );
            }
        } else setFinalBar(<div className="top-bar">{basicBar}</div>);
    }, [targetIndex, finalSvg, setFinalSvg, setTransformNode, canvasRef]);

    return finalBar;
};

export default TopBar;
