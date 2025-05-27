import { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";

export default function CoverPhoto({ src, width, height }) {
    const [ component, setComponent ] = useState(<LoadingIcon width={20} height={20} />);
    const [ loaded, setLoaded ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        setComponent(<p>(No cover)</p>);
    }, [ error ]);

    useEffect(() => {
        setComponent(<img src={src} width={width} height={height} />);
    }, [ loaded ]);

    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);

    useEffect(() => {
        img.src = src;
    }, [])

    const containerCSS = {
        width: width,
        height: height,
        display: "grid",
        placeContent: "center",
        border: "1px solid grey",
        backgroundColor: "#303030"
    };
    const imageCSS = {
        width: width,
        height: height
    }

    

    return (
        <div style={containerCSS}>
            {
                component
            }
        </div>
    )
}