import { Ellipse } from "../../../types";

interface props {
    finalSvg: Ellipse[];
    ellipseIndex: number;
}

const EllipseTransformNode = ({ finalSvg, ellipseIndex }: props) => {
    const template = {
        width: 13,
        height: 13,
        fill: "#2E66F9",
        stroke: "white",
        strokeWidth: 2,
    };
    return (
        <>
            <line
                className="ellipse-cross"
                id="cross"
                x1={finalSvg[ellipseIndex].cx}
                y1={finalSvg[ellipseIndex].cy! - 5}
                x2={finalSvg[ellipseIndex].cx}
                y2={finalSvg[ellipseIndex].cy! + 5}
                stroke="black"
                strokeWidth="2"
            />
            <line
                className="ellipse-cross"
                id="cross"
                x1={finalSvg[ellipseIndex].cx! - 5}
                y1={finalSvg[ellipseIndex].cy}
                x2={finalSvg[ellipseIndex].cx! + 5}
                y2={finalSvg[ellipseIndex].cy}
                stroke="black"
                strokeWidth="2"
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="left"
                x={finalSvg[ellipseIndex].cx! - finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="right"
                x={finalSvg[ellipseIndex].cx! + finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="bottom-left"
                x={finalSvg[ellipseIndex].cx! - finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! + finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="bottom"
                x={finalSvg[ellipseIndex].cx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! + finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="bottom-right"
                x={finalSvg[ellipseIndex].cx! + finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! + finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="top-left"
                x={finalSvg[ellipseIndex].cx! - finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! - finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="top"
                x={finalSvg[ellipseIndex].cx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! - finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
            <rect
                className="ellipse-transform-node transform-node"
                id="top-right"
                x={finalSvg[ellipseIndex].cx! + finalSvg[ellipseIndex].rx! - template.width / 2}
                y={finalSvg[ellipseIndex].cy! - finalSvg[ellipseIndex].ry! - template.width / 2}
                {...template}
            />
        </>
    );
};

export default EllipseTransformNode;
