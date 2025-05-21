import { useState, useEffect } from "react"

export default function SelectionInput({ options, selection, selectionSetter }) {
    const containerStyle = {
        padding: 5,
        display: "flex",
        flexFlow: "wrap",
        rowGap: 5,
        columnGap: 10
    };

    const toggleCheckbox = key => {
        const newSelection = {};
        Object.assign(newSelection, selection);
        newSelection[key] = !newSelection[key];
        console.log(newSelection);
        selectionSetter(newSelection);
    }

    return (
        <div style={containerStyle}>
            {
            options.map((option, index) => {
                let label, key, checked;
                if (typeof option === "object") {
                    label = option.value;
                    key = options.key;
                    checked = selection[option.key];
                } else {
                    label = `${option}`;
                    key = option;
                    checked = selection[option];
                }

                return (
                    <label key={index} style={{ cursor: "pointer" }}><input type="checkbox" checked={checked} onChange={e => toggleCheckbox(key)} selectionkey={key} /> {label}</label>
                );
            })
        }</div>
    )
}