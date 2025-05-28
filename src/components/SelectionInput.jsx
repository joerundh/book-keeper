import { useEffect } from "react";

export default function SelectionInput({ options, selection, selectionSetter }) {
    const containerStyle = {
        padding: 5,
        display: "flex",
        flexFlow: "wrap",
        rowGap: 5,
        columnGap: 20
    };

    const toggleCheckbox = setKey => {
        const newSelection = {};
        Object.entries(selection).forEach(([ key, value ]) => {
            newSelection[key] = key === setKey ? !selection[key] : selection[key];
        });
        selectionSetter(newSelection);
    }

    return (
        <div style={containerStyle}>
            {
                options instanceof Array ? 
                    options.map((option, index) => {
                        return (
                            <label key={index} title={option} style={{ cursor: "pointer" }}><input type="checkbox" checked={selection[option]} onChange={e => toggleCheckbox(option)} /> {option}</label>
                        );
                    })
                :
                    Object.entries(options).map(([key, value]) => {
                        return (
                            <label key={key} title={value} style={{ cursor: "pointer" }}><input type="checkbox" checked={selection[key]} onChange={e => toggleCheckbox(key)} /> {value}</label>
                        );
                    })
            }
        </div>
    )
}