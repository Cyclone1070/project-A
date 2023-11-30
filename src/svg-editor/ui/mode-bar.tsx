import ModeButton from "./buttons/mode-button";

interface props {
    setDrawMode: React.Dispatch<React.SetStateAction<string>>;
    drawMode: string;
}

const ModeBar = ({ setDrawMode, drawMode }: props) => {
    return (
        <div className="tool-bar">
            <ModeButton modeSetter={setDrawMode} mode={"transform"} drawMode={drawMode}>
                Transform
            </ModeButton>
            <ModeButton modeSetter={setDrawMode} mode={"path"} drawMode={drawMode}>
                Path
            </ModeButton>
            <ModeButton modeSetter={setDrawMode} mode={"rect"} drawMode={drawMode}>
                Rect
            </ModeButton>
            <ModeButton modeSetter={setDrawMode} mode={"ellipse"} drawMode={drawMode}>
                Ellipse
            </ModeButton>
        </div>
    );
};

export default ModeBar;
