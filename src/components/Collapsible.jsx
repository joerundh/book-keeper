import { useState } from "react";

export default function Collapsible({ header, view, children }) {
    const [ viewing, setViewing ] = useState(view || false);

    const toggleViewing = () => {
        setViewing(!viewing);
    }

    const contentCSS = {
        display: viewing ? "inline-block" : "none"
    }

    return (
        <div style={{ width: "100%" }}>
            <p onClick={toggleViewing} title={`${viewing ? "Hide" : "Show"} ${header}`} style={{ userSelect: "none", cursor: "pointer" }}>{viewing ? "\u25B2" : "\u25BC"} <b>{header} ({viewing ? "Hide" : "Show"})</b></p>
            <div style={contentCSS}>{children}</div>
        </div>
    )
}