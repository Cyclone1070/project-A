import { FinalSvg } from "./types";
import Canvas from "./ui/canvas";
import ToolBar from "./ui/tool-bar";
import useTransform from "./logic/logic-transform/use-transform";
import useRect from "./logic/logic-svg/use-rect";
import useEllipse from "./logic/logic-svg/use-ellipse";
import "./editor.css";
import { useRef, useState } from "react";

const Editor = () => {
    const canvasRef = useRef<SVGSVGElement>(null) as React.MutableRefObject<SVGSVGElement>;
    const [drawMode, setDrawMode] = useState("transform"); /* for choosing draw mode */
    const [finalSvg, setFinalSvg] = useState<FinalSvg>([]);
    const { tempRect, rectEvent } = useRect(setFinalSvg);
    const { tempEllipse, ellipseEvent } = useEllipse(setFinalSvg);
    const { transformEvent, transformNode, highlightNode, selectionBox } = useTransform(
        finalSvg,
        setFinalSvg,
        drawMode,
        canvasRef
    );

    return (
        <div className="editor">
            <ToolBar setDrawMode={setDrawMode} />
            <Canvas
                canvasRef={canvasRef}
                {...(drawMode === "transform" && { drawEvent: transformEvent })}
                {...(drawMode === "rect" && { drawEvent: rectEvent })}
                {...(drawMode === "ellipse" && { drawEvent: ellipseEvent })}
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
