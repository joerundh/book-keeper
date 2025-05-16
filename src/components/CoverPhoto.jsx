import { useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function CoverPhoto({ src, width, height }) {
    const [ loaded, setLoaded ] = useState(false);
    const [ error, setError ] = useState(false);

    const img = new Image();
    new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = src;
    })
    .then(() => setLoaded(true))
    .catch(() => setError(true));

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
                loaded ? (
                    <img src={img.src} style={imageCSS} />
                ) : (
                    error ? (
                        <span>No cover</span>
                    ) : (
                        <LoadingIcon width={20} />
                    )
                )
            }
        </div>
    )
}