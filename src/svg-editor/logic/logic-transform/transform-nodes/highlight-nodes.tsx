import { FinalSvg } from "../../../types";

const SelectHighlightNode = (e: React.MouseEvent, finalSvg: FinalSvg, targetIndex: number) => {
    if ((e.target as HTMLElement).tagName === "rect") {
        const svgIndex = finalSvg.findIndex((rect) => rect.id === (e.target as HTMLElement).id);
        if (svgIndex === targetIndex) {
            return <></>;
        } else if (svgIndex !== -1) {
            return [
                {
                    ...finalSvg[svgIndex],
                    fill: "transparent",
                    stroke: "red",
                    style: { pointerEvents: "none" },
                },
            ];
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
