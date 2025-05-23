import { useContext, useState } from "react"
import { BookContext } from "../App";

export default function FavouriteButton({ book }) {
    const { isInFavourites, addToFavourites, removeFromFavourites } = useContext(BookContext);

    const buttonCSS = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: "0 10"
    }
    const favouritedIconCSS = {
        width: 20,
        height: 20,
        filter: "none"
    };
    const unfavouritedIconCSS = {
        width: 20,
        height: 20,
        filter: "contrast(0%)"
    };

    const iconStyle = () => {
        if (isInFavourites(book)) {
            return favouritedIconCSS;
        } else {
            return unfavouritedIconCSS;
        }
    }
    const iconSrc = () => {
        if (isInFavourites(book)) {
            return `${location.origin}/src/assets/star-icon.png`;
        } else {
            return `${location.origin}/src/assets/star-empty-icon.png`;
        }
    }

    const label = () => {
        if (isInFavourites(book)) {
            return "Remove from favourites";
        } else {
            return "Add to favourites";
        }
    }

    const handleClick = () => {
        if (isInFavourites(book)) {
            removeFromFavourites(book);
        } else {
            addToFavourites(book)
        }
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()} title={label()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}