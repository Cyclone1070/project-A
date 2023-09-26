import { FinalSvg } from "../../../types";

interface props {
    e: React.MouseEvent;
    finalSvg: FinalSvg;
    targetIndex: number;
}

const SelectHighlightNode = ({ e, finalSvg, targetIndex }: props) => {
    if ((e.target as HTMLElement).tagName === "rect") {
        const rectIndex = finalSvg.findIndex((rect) => rect.id === (e.target as HTMLElement).id);
        if (rectIndex === targetIndex) {
            return <></>;
        } else if (rectIndex !== -1) {
            return (
                <rect
                    className="transform-node"
                    x={finalSvg[rectIndex].x}
                    y={finalSvg[rectIndex].y}
                    width={finalSvg[rectIndex].width}
                    height={finalSvg[rectIndex].height}
                    fill="transparent"
                    strokeWidth={finalSvg[rectIndex].strokeWidth}
                    stroke="red"
                    style={{ pointerEvents: "none" }}
                />
            );
        }
    } else if ((e.target as HTMLElement).tagName === "ellipse") {
        const ellipseIndex = finalSvg.findIndex(
            (ellipse) => ellipse.id === (e.target as HTMLElement).id
        );
        if (ellipseIndex === targetIndex) {
            return <></>;
        } else if (ellipseIndex !== -1) {
            return (
                <ellipse
                    className="transform-node"
                    cx={finalSvg[ellipseIndex].cx}
                    cy={finalSvg[ellipseIndex].cy}
                    rx={finalSvg[ellipseIndex].rx}
                    ry={finalSvg[ellipseIndex].ry}
                    fill="transparent"
                    strokeWidth={finalSvg[ellipseIndex].strokeWidth}
                    stroke="red"
                    style={{ pointerEvents: "none" }}
                />
            );
        }
    }
};

export default SelectHighlightNode;
