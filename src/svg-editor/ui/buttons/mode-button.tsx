interface props {
    children: string;
    modeSetter: React.Dispatch<React.SetStateAction<string>>;
    mode: string;
    drawMode: string;
}
const ModeButton = ({ children, modeSetter, mode, drawMode }: props) => {
    const buttonHighlight = drawMode === mode ? { backgroundColor: "#007AFF" } : {};
    return (
        <button
            className="mode-button"
            style={buttonHighlight}
            onClick={() => {
                modeSetter(mode);
            }}
        >
            {children}
        </button>
    );
};

export default ModeButton;
