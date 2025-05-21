import { useState } from "react";

export default function Collapsible({ header, view, children }) {
    const [ viewing, setViewing ] = useState(view || false);

    const toggleViewing = () => {
        setViewing(!viewing);
    }

    return (
        <div>
            <p onClick={toggleViewing} style={{ cursor: "pointer" }}>{viewing ? "\u25B2" : "\u25BC"} <b>{header} ({viewing ? "Hide" : "Show"})</b></p>
            { viewing ? (
                <div>{children}</div>
            ) : (<></>)}
        </div>
    )
}