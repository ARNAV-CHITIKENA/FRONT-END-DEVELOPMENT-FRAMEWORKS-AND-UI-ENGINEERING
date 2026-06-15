
import { useState, useEffect } from "react";

// Custom Hook demo
function useWindowSize() {

    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {

        // This function executes whenever browser resizes
        const handler = () => {

            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

        };

        window.addEventListener("resize", handler);

        return () =>
            window.removeEventListener("resize", handler);

    }, []);

    return size;
}
// using custom hook in this Component

function ResponsiveLayout() {

    const { width } = useWindowSize();

    return (

        <div>

            <h2>
                {width < 768 ? "Mobile Layout" : "Desktop Layout"}
            </h2>

            <p>Width: {width}px </p>

        </div>
    );
}

export default ResponsiveLayout;
