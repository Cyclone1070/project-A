interface props {
    children: string;
    modeSetter: React.Dispatch<React.SetStateAction<string>>;
    mode: string;
}
const ModeButton = ({ children, modeSetter, mode }: props) => {
    return (
        <button
            onClick={() => {
                modeSetter(mode);
            }}
        >
            {children}
        </button>
    );
};

export default ModeButton;
