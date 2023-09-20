import { Rect } from "../../../types";

interface props {
    finalSvg: Rect[];
    rectIndex: number;
}

const RectTransformNode = ({ finalSvg, rectIndex }: props) => {
    const template = {
        width: 13,
        height: 13,
        fill: "rgb(46, 102, 249)",
        stroke: "white",
        strokeWidth: 2,
    };

    return (
        <>
            <line
                className="rect-transform-node"
                id="cross"
                x1={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                y1={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 - 5}
                x2={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2}
                y2={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 + 5}
                stroke="black"
                strokeWidth="2"
            />
            <line
                className="rect-transform-node"
                id="cross"
                x1={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - 5}
                y1={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2}
                x2={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 + 5}
                y2={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2}
                stroke="black"
                strokeWidth="2"
            />
            <rect
                className="rect-transform-node"
                id="right"
                x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="left"
                x={finalSvg[rectIndex].x! - template.width / 2}
                y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! / 2 - template.height / 2}
                {...template}
            />

            <rect
                className="rect-transform-node"
                id="bottom-right"
                x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="bottom"
                x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - template.width / 2}
                y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="bottom-left"
                x={finalSvg[rectIndex].x! - template.width / 2}
                y={finalSvg[rectIndex].y! + finalSvg[rectIndex].height! - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="top-right"
                x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! - template.width / 2}
                y={finalSvg[rectIndex].y! - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="top"
                x={finalSvg[rectIndex].x! + finalSvg[rectIndex].width! / 2 - template.width / 2}
                y={finalSvg[rectIndex].y! - template.height / 2}
                {...template}
            />
            <rect
                className="rect-transform-node"
                id="top-left"
                x={finalSvg[rectIndex].x! - template.width / 2}
                y={finalSvg[rectIndex].y! - template.width / 2}
                {...template}
            />
        </>
    );
};

export default RectTransformNode;
