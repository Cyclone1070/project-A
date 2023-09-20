import ModeButton from "./mode-button";

interface props {
    setDrawMode: React.Dispatch<React.SetStateAction<string>>;
}

const ToolBar = ({ setDrawMode }: props) => {
    return (
        <div className="tool-bar">
            <ModeButton modeSetter={setDrawMode} mode={"transform"}>
                Transform
            </ModeButton>
            <ModeButton modeSetter={setDrawMode} mode={"rect"}>
                Rect
            </ModeButton>
            <ModeButton modeSetter={setDrawMode} mode={"ellipse"}>
                Ellipse
            </ModeButton>
        </div>
    );
};

export default ToolBar;
