import { useContext, useState } from "react"
import { BookContext } from "../App";

export default function ReadingListButton({ book }) {
    const { readingList } = useContext(BookContext);

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
        if (readingList.hasBook(book)) {
            return addedIconCSS;
        } else {
            return removedIconCSS;
        }
    }
    const iconSrc = () => {
        if (readingList.hasBook(book)) {
            return "./src/assets/book-filled-icon.png";
        } else {
            return "./src/assets/book-outline-icon.png";
        }
    }

    const label = () => {
        if (readingList.hasBook(book)) {
            return "Remove from Reading List";
        } else {
            return "Add to Reading List";
        }
    }

    const handleClick = () => {
        if (readingList.hasBook(book)) {
            readingList.removeBook(book);
        } else {
            readingList.addBook(book);
        }
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}