import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";

export default function ReadingListButton({ book }) {
    const { isInReadingList, addToReadingList, removeFromReadingList } = useContext(BookContext);

    const buttonCSS = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: "0 10"
    }
    const addedIconCSS = {
        width: 20,
        height: 20,
        filter: "none"
    };
    const removedIconCSS = {
        width: 20,
        height: 20,
        filter: "contrast(0%)"
    };

    const iconStyle = () => {
        if (isInReadingList(book)) {
            return addedIconCSS;
        } else {
            return removedIconCSS;
        }
    }
    const iconSrc = () => {
        if (isInReadingList(book)) {
            return `./book-filled-icon.png`;
        } else {
            return `./book-outline-icon.png`;
        }
    }

    const label = () => {
        if (isInReadingList(book)) {
            return "Remove from Reading List";
        } else {
            return "Add to Reading List";
        }
    }

    const handleClick = () => {
        if (isInReadingList(book)) {
            removeFromReadingList(book);
        } else {
            addToReadingList(book);
        }
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()} title={label()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}