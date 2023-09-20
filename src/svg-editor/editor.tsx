import { FinalSvg } from "./types";
import Canvas from "./ui/canvas";
import ToolBar from "./ui/tool-bar";
import useTransform from "./logic/logic-general/use-transform";
import useRect from "./logic/logic-svg/use-rect";
import useEllipse from "./logic/logic-svg/use-ellipse";
import "./editor.css";
import { useState } from "react";

const Editor = () => {
    const [drawMode, setDrawMode] = useState("transform"); /* for choosing draw mode */
    const [finalSvg, setFinalSvg] = useState<FinalSvg>([]);
    const { tempRect, rectEvent } = useRect(setFinalSvg);
    const { tempEllipse, ellipseEvent } = useEllipse(setFinalSvg);
    const { transformEvent, transformNode } = useTransform(finalSvg, setFinalSvg, drawMode);

    return (
        <div className="editor">
            <ToolBar setDrawMode={setDrawMode} />
            <Canvas
                {...(drawMode === "rect" && { drawEvent: rectEvent })}
                {...(drawMode === "transform" && { drawEvent: transformEvent })}
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
                {transformNode}
            </Canvas>
        </div>
    );
};

export default Editor;
