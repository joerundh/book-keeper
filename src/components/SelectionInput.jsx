import { useState, useEffect } from "react"

export default function SelectionInput({ options, selection, selectionSetter }) {
    const containerStyle = {
        padding: 5,
        display: "flex",
        flexFlow: "wrap",
        rowGap: 5,
        columnGap: 20
    };

    const toggleCheckbox = (element, key) => {
        const newSelection = {};
        Object.assign(newSelection, selection);
        newSelection[key] = !newSelection[key];
        selectionSetter(newSelection);
    }

    return (
        <div style={containerStyle}>
            {
            options.map((option, index) => {
                let label, key, checked;
                if (typeof option === "object") {
                    label = option.value;
                    key = option.key;
                    checked = selection[key];
                } else {
                    label = `${option}`;
                    key = option;
                    checked = selection[option];
                }

                return (
                    <label key={index} style={{ cursor: "pointer" }}><input type="checkbox" checked={checked} onChange={e => toggleCheckbox(e.target, key)} /> {label}</label>
                );
            })
        }</div>
    )
}