import useViewBox from "../logic/logic-general/use-view-box";

interface props {
    children: React.ReactNode;
    drawEvent?: object;
    canvasRef: React.MutableRefObject<SVGSVGElement>;
}

const Canvas = ({ children, drawEvent, canvasRef }: props) => {
    const { size } = useViewBox(canvasRef);

    return (
        <svg
            {...drawEvent}
            ref={canvasRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            {children}
        </svg>
    );
};

export default Canvas;
