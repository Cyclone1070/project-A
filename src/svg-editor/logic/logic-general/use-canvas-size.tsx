/* logic for setting viewBox */

import { useEffect, useRef, useState } from "react";

const useCanvasSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const sizeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        changeSize();
        window.addEventListener("resize", changeSize);

        function changeSize() {
            if (sizeRef.current) {
                setSize({
                    width: sizeRef.current.width.baseVal.value,
                    height: sizeRef.current.height.baseVal.value,
                });
            }
        }
        return () => {
            window.removeEventListener("resize", changeSize);
        };
    }, []);
    return { size, sizeRef };
};

export default useCanvasSize;
