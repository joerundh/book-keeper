import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";

export default function ReadingListButton({ book }) {
    const { readingList } = useContext(BookContext);

    const [ isReading, setIsReading ] = useState(readingList.hasBook(book));
    useEffect(() => {
        readingList.removeBook(book);
    }, [ isReading ]);

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
        if (isReading) {
            return addedIconCSS;
        } else {
            return removedIconCSS;
        }
    }
    const iconSrc = () => {
        if (isReading) {
            return "./src/assets/book-filled-icon.png";
        } else {
            return "./src/assets/book-outline-icon.png";
        }
    }

    const label = () => {
        if (isReading) {
            return "Remove from Reading List";
        } else {
            return "Add to Reading List";
        }
    }

    const handleClick = () => {
        setIsReading(!isReading);
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}