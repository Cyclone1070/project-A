import useCanvasSize from "../logic/logic-general/use-canvas-size";

interface props {
    children: React.ReactNode;
    drawEvent?: object;
}

const Canvas = ({ children, drawEvent }: props) => {
    const { size, sizeRef } = useCanvasSize();

    return (
        <svg
            {...drawEvent}
            ref={sizeRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};

export default Canvas;
