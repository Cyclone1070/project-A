/* logic for setting viewBox */

import { useEffect, useState } from "react";

const useViewBox = (canvasRef: React.MutableRefObject<SVGSVGElement>) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        changeSize();
        window.addEventListener("resize", changeSize);

        function changeSize() {
            if (canvasRef.current) {
                setSize({
                    width: canvasRef.current.getBoundingClientRect().width,
                    height: canvasRef.current.getBoundingClientRect().height,
                });
            }
        }
        return () => {
            window.removeEventListener("resize", changeSize);
        };
    }, [canvasRef]);
    return { size, canvasRef };
};

export default useViewBox;
