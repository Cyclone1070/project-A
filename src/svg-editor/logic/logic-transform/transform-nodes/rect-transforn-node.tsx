import { Rect } from "../../../types";

interface props {
    finalSvg: Rect[];
    rectIndex: number;
    rotate: string;
}

const RectTransformNode = ({ finalSvg, rectIndex, rotate }: props) => {
    const template = {
        width: 13,
        height: 13,
        fill: "#2E66F9",
        stroke: "white",
        strokeWidth: 2,
    };

    return (
        <>
            <g className="transform-node" transform={rotate}>
                <line
                    className="rect-transform-node transform-node"
                    x1={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                    y1={finalSvg[rectIndex].y! - template.width / 2}
                    x2={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                    y2={finalSvg[rectIndex].y! - template.width / 2 - 15}
                    stroke="black"
                    strokeWidth="1.5"
                />
                <ellipse
                    className="rect-transform-node transform-node"
                    id="rotate"
                    cx={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                    cy={finalSvg[rectIndex].y! - template.width / 2 - 20}
                    rx="7"
                    ry="7"
                    {...template}
                />
                <line
                    className="rect-cross cross"
                    id="cross"
                    x1={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                    y1={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 - 5}
                    x2={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                    y2={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 + 5}
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    className="rect-cross cross"
                    id="cross"
                    x1={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - 5}
                    y1={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2}
                    x2={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 + 5}
                    y2={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2}
                    stroke="black"
                    strokeWidth="2"
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="left"
                    x={finalSvg[rectIndex].x! - template.width / 2}
                    y={
                        finalSvg[rectIndex].y! +
                        finalSvg[rectIndex].height! / 2 -
                        template.width / 2
                    }
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="right"
                    x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                    y={
                        finalSvg[rectIndex].y! +
                        finalSvg[rectIndex].height! / 2 -
                        template.width / 2
                    }
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="bottom-left"
                    x={finalSvg[rectIndex].x! - template.width / 2}
                    y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.width / 2}
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="bottom"
                    x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - template.width / 2}
                    y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.width / 2}
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="bottom-right"
                    x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                    y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.width / 2}
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="top-left"
                    x={finalSvg[rectIndex].x! - template.width / 2}
                    y={finalSvg[rectIndex].y! - template.width / 2}
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="top"
                    x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - template.width / 2}
                    y={finalSvg[rectIndex].y! - template.width / 2}
                    {...template}
                />
                <rect
                    className="rect-transform-node transform-node"
                    id="top-right"
                    x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                    y={finalSvg[rectIndex].y! - template.width / 2}
                    {...template}
                />
            </g>
        </>
    );
};

export default RectTransformNode;
