import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";
import bookIcon from "../assets/book-filled-icon.png";
import bookOutlineIcon from "../assets/book-outline-icon.png";

export default function ReadingListButton({ book }) {
    const { isInReadingList, addToReadingList, removeFromReadingList } = useContext(BookContext);
    const [ isReading, setIsReading ] = useState(isInReadingList(book));

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

    const icon = () => isReading ? bookIcon : bookOutlineIcon;
    const label = () => isReading ? "Remove from Reading List" : "Add to Reading List";

    const handleClick = () => setIsReading(!isReading);

    useEffect(() => {
        if (isReading) {
            addToReadingList(book);
        } else {
            removeFromReadingList(book);
        }
    }, [ isReading ]);

    return (
        <button style={buttonCSS} onClick={handleClick} title={label()}>
            <img style={iconCSS} src={icon()} />
            <span>{label()}</span>
        </button>
    );
}