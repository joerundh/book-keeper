import { useContext, useState } from "react"
import { BookContext } from "../App";

export default function FavouriteButton({ book }) {
    const { favBooks } = useContext(BookContext);

    const filteredFavList = favBooks.getList().filter(obj => obj.value.id === book.id);
    const [ storageKey, setStorageKey ] = useState(filteredFavList.length ? filteredFavList[0].key : "");

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
        if (storageKey) {
            return favouritedIconCSS;
        } else {
            return unfavouritedIconCSS;
        }
    }
    const iconSrc = () => {
        if (storageKey) {
            return `${location.origin}/src/assets/star-icon.png`;
        } else {
            return `${location.origin}/src/assets/star-empty-icon.png`;
        }
    }

    const label = () => {
        if (storageKey) {
            return "Remove from favourites";
        } else {
            return "Add to favourites";
        }
    }

    const handleClick = () => {
        if (storageKey) {
            favBooks.removeValue(book);
            setStorageKey("");
        } else {
            const key = favBooks.addValue(book);
            setStorageKey(key);
        }
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()} title={storageKey ? "Remove from Favourites" : "Add to Favourites"}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}