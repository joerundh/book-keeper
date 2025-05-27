import { useContext } from "react"
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
    const iconCSS = {
        width: 20,
        height: 20,
        filter: isInFavourites(book) ? "none" : "contrast(0%)"
    };
    const unfavouritedIconCSS = {
        width: 20,
        height: 20,
        filter: "contrast(0%)"
    };
    
    const iconSrc = () => {
        return isInFavourites(book) ? `../assets/star-icon.png` : `../assets/star-empty-icon.png`;
    }

    const label = () => {
        return isInFavourites(book) ? "Remove from favourites" : "Add to favourites";
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
            <img style={iconCSS} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}