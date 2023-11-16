import { FinalSvg, SingleFinalSvg } from "../../types";
import RectTransformNode from "../../logic/logic-transform/transform-nodes/rect-transforn-node";
import EllipseTransformNode from "../../logic/logic-transform/transform-nodes/ellipse-transform-node";

interface props {
    name: keyof SingleFinalSvg | "rotate";
    value: number;
    targetIndex: number;
    setFinalSvg: React.Dispatch<React.SetStateAction<FinalSvg>>;
    setTransformNode: React.Dispatch<React.SetStateAction<JSX.Element>>;
    canvasRef: React.MutableRefObject<SVGSVGElement>;
}

const TopBarInput = ({
    name,
    value,
    targetIndex,
    setFinalSvg,
    setTransformNode,
    canvasRef,
}: props) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFinalSvg((prev) => {
            const newSvg = [...prev];
            if (name === "rotate") {
                const bbox = (
                    canvasRef.current.children[targetIndex] as SVGGraphicsElement
                ).getBBox();
                newSvg[targetIndex].transform = `rotate(${e.target.value} ${
                    bbox.x + bbox.width / 2
                } ${bbox.y + bbox.height / 2})`;
            } else {
                (newSvg[targetIndex][name] as number) = +e.target.value;
            }
            if (newSvg[targetIndex].tag === "rect") {
                setTransformNode(
                    <RectTransformNode
                        finalSvg={newSvg}
                        rectIndex={targetIndex}
                        transform={newSvg[targetIndex].transform!}
                    />
                );
            } else if (newSvg[targetIndex].tag === "ellipse") {
                setTransformNode(
                    <EllipseTransformNode
                        finalSvg={newSvg}
                        ellipseIndex={targetIndex}
                        transform={newSvg[targetIndex].transform!}
                    />
                );
            }
            return newSvg;
        });
    }
    return (
        <label>
            {name}{" "}
            <input className="top-bar-input" type="number" value={value} onChange={handleChange} />
        </label>
    );
};

export default TopBarInput;
