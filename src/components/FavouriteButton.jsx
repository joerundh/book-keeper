import { useContext, useState } from "react"
import { StorageContext } from "../main";

export default function FavouriteButton({ book }) {
    const { favBooks } = useContext(StorageContext);
    const [ storageKey, setStorageKey ] = useState(favBooks.getKeyFromValue(book.id) || "");

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
            return "./src/assets/star-icon.png";
        } else {
            return "./src/assets/star-empty-icon.png";
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
            favBooks.removeItem(storageKey);
            setStorageKey("");
        } else {
            const key = favBooks.addItem(book.id);
            setStorageKey(key);
        }
    }

    return (
        <button style={buttonCSS} onClick={() => handleClick()}>
            <img style={iconStyle()} src={iconSrc()} />
            <span>{label()}</span>
        </button>
    );
}