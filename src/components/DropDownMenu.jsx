import { useRef, useState, useEffect } from "react";
import DropDownLink from "./DropDownLink";
import styles from "../assets/DropDownMenu.module.css";

export default function DropDownMenu({ title, iconAsset, side, children }) {
    const [ open, setOpen ] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null)
    const [ top, setTop ] = useState(0);
    const [ left, setLeft ] = useState(0);

    const navStyle = {
        transform: open ? "scaleY(1)" : "scaleY(0)",
        transition: "transform 200ms ease-in-out",
        top: top + 40,
        left: left - 10
    }

    const buttonStyle = {
        maskImage: `url("./assets/${open ? "close-icon.png" : iconAsset }")`
    }

    const offClick = () => {
        window.removeEventListener("click", offClick);
        setOpen(false);
    }

    const setPosition = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        setTop(rect.top);
        if (side === "left") {
            setLeft(rect.left);
        } else if (side === "right") {
            setLeft(rect.left - 150);
        } else {
            setLeft(rect.left)
        }
    }

    const toggleOpen = event => {
        event.stopPropagation();
        if (!open) {
            setPosition();
            window.addEventListener("click", offClick);
        } else {
            window.removeEventListener("click", offClick)
        }
        setOpen(!open);
    }

    const resizeObserver = new ResizeObserver((entries) => {
        setPosition();
    })
    resizeObserver.observe(document.body);

    return (
        <>
            <button className={styles.navButton} style={buttonStyle} title={title} onClick={e => toggleOpen(e)} ref={buttonRef}></button>
            <nav onClick={e => toggleOpen(e)} style={navStyle} ref={menuRef}>
                {
                    children
                }
            </nav>
        </>
    )
}