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
            <p>Choose:</p>
            <div>
                {
                    options.filter(option => !selection.includes(option))
                            .map((option, index) => (
                                <button key={index} onClick={e => { e.preventDefault(); selectOption(option); }}>{option}</button>
                            ))
                }
            </div>
            <p>Selected:</p>
            {
                selection.length ? (
                    <div>
                        {
                            options.filter(option => selection.includes(option))
                                    .map((option, index) => (
                                        <button key={index} onClick={e => { e.preventDefault(); unselectOption(option); }}>{option}</button>
                                    ))
                        }
                    </div>
                ) : (
                    <p>None selected.</p>
                )
            }
        </div>
    )
}