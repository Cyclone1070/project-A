import { FinalSvg } from "./types";
import TopBar from "./ui/top-bar";
import Canvas from "./ui/canvas";
import ModeBar from "./ui/mode-bar";
import useTransform from "./logic/logic-transform/use-transform";
import useRect from "./logic/logic-svg/use-rect";
import useEllipse from "./logic/logic-svg/use-ellipse";
import usePath from "./logic/logic-svg/use-path";
import "./editor.css";
import { useRef, useState } from "react";

const Editor = () => {
    const canvasRef = useRef<SVGSVGElement>(null) as React.MutableRefObject<SVGSVGElement>;
    const [drawMode, setDrawMode] = useState("transform");
    const [finalSvg, setFinalSvg] = useState<FinalSvg>([]);
    const { tempRect, rectEvent } = useRect(setFinalSvg);
    const { tempEllipse, ellipseEvent } = useEllipse(setFinalSvg);
    const { tempPath, pathEvent } = usePath(setFinalSvg);
    const {
        transformEvent,
        transformNode,
        setTransformNode,
        highlightNode,
        selectionBox,
        targetIndex,
    } = useTransform(finalSvg, setFinalSvg, drawMode, canvasRef);

    return (
        <div className="editor">
            <TopBar
                targetIndex={targetIndex}
                finalSvg={finalSvg}
                setFinalSvg={setFinalSvg}
                setTransformNode={setTransformNode}
                canvasRef={canvasRef}
            />
            <ModeBar setDrawMode={setDrawMode} drawMode={drawMode} />
            <Canvas
                canvasRef={canvasRef}
                {...(drawMode === "transform" && { drawEvent: transformEvent })}
                {...(drawMode === "rect" && { drawEvent: rectEvent })}
                {...(drawMode === "ellipse" && { drawEvent: ellipseEvent })}
                {...(drawMode === "path" && { drawEvent: pathEvent })}
            >
                {finalSvg.map(({ tag, ...currentSvg }) => {
                    if (tag === "rect") {
                        return <rect key={currentSvg.id} {...currentSvg} />;
                    }
                    if (tag === "ellipse") {
                        return <ellipse key={currentSvg.id} {...currentSvg} />;
                    }
                })}
                <rect className="temp" {...tempRect} />
                <ellipse className="temp" {...tempEllipse} />
                <path className="temp" {...tempPath} />
                {highlightNode.map(({ tag, ...currentSvg }) => {
                    if (tag === "rect") {
                        return <rect key={currentSvg.id} {...currentSvg} />;
                    }
                    if (tag === "ellipse") {
                        return <ellipse key={currentSvg.id} {...currentSvg} />;
                    }
                })}
                {transformNode}
                <rect className="temp" {...selectionBox} />
            </Canvas>
        </div>
    );
};

export default Editor;
