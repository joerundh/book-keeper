import { useState } from "react"

export default function SelectionInput({ selection, options, setter }) {
    const selectOption = (option) => {
        if (selection.includes(option)) return;
        setter([ ...selection, option ]);
    }

    const unselectOption = option => {
        const newSelection = selection.filter(op => op !== option);
        setter(newSelection);
    }

    return (
        <div>
            <p>Selected:</p>
            <div>
                {
                    options.filter(option => selection.includes(option))
                            .map(option => (
                                <button onClick={() => unselectOption(option)}>{option}</button>
                            ))
                }
            </div>
            <p>Choose from:</p>
            <div>
                {
                    options.filter(option => !selected.includes(option))
                            .map(option => (
                                <button onClick={() => selectOption(option)}>{option}</button>
                            ))
                }
            </div>
        </div>
    )
}