import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";

export default function ReadingListButton({ book }) {
    const { isInReadingList, addToReadingList, removeFromReadingList } = useContext(BookContext);
    const { isReading, setIsReading } = useState(isInReadingList(book));

    const buttonCSS = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: "0 10"
    }
    const iconCSS = {
        width: 20,
        height: 20,
        filter: isReading ? "none" : "contrast(0%)"
    };

    const iconSrc = () => isReading ? "/book-filled-icon.png" : "/book-outline-icon.png";
    const label = () => isReading ? "Remove from Reading List" : "Add to Reading List";

    const handleClick = () => {
        setIsReading(!isReading);
    }

    useEffect(() => {
        if (isReading) {
            addToReadingList(book);
        } else {
            removeFromReadingList(book);
        }
    }, [ isReading ]);

    return (
        <button style={buttonCSS} onClick={() => handleClick()} title={label()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}