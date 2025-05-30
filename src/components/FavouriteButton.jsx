import { useContext, useEffect, useState } from "react"
import { BookContext } from "../App";
import starIcon from "../assets/star-icon.png";
import starOutlineIcon from "../assets/star-empty-icon.png";

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
    
    const icon = () => isInFavourites(book) ? starIcon : starOutlineIcon;
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
            <img style={iconCSS} src={icon()} />
            <span>{label()}</span>
        </button>
    );
}