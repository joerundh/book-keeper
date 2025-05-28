import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";

export default function FavouriteButton({ book }) {
    const { isInFavourites, addToFavourites, removeFromFavourites } = useContext(BookContext);
    const [ isFavourited, setIsFavourited ] = useState(isInFavourites(book));

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
        filter: isFavourited ? "none" : "contrast(0%)"
    };
    
    const iconSrc = () => isInFavourites(book) ? "/star-icon.png" : "/star-empty-icon.png";
    const label = () => isInFavourites(book) ? "Remove from favourites" : "Add to favourites";

    const handleClick = () => {
        setIsFavourited(!isFavourited);
    }

    useEffect(() => {
        if (isFavourited) {
            addToFavourites(book);
        } else {
            removeFromFavourites(book);
        }
    }, [ isFavourited ])

    return (
        <button style={buttonCSS} onClick={() => handleClick()} title={label()}>
            <img style={iconCSS} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}