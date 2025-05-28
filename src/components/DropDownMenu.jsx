import { useRef, useState, useEffect } from "react";
import styles from "../assets/DropDownMenu.module.css";

export default function DropDownMenu({ title, closedIcon, openIcon, side, children }) {
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
        maskImage: `url("${open ? openIcon : closedIcon}")`
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

    const handleClick = event => {
        if (event.target === buttonRef.current || event.target === menuRef.current) {
            if (open) {
                window.removeEventListener("click", handleClick);
                setOpen(false)
            } else {
                window.addEventListener("click", handleClick);
                setOpen(true)
            }
        } else {
            window.removeEventListener("click", handleClick);
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open) {
            setPosition();
        }
    }, [ open ])

    const resizeObserver = new ResizeObserver((entries) => {
        setPosition();
    })
    resizeObserver.observe(document.body);

    return (
        <>
            <button className={styles.navButton} style={buttonStyle} title={title} onClick={e => handleClick(e)} ref={buttonRef}></button>
            <nav onClick={e => handleClick(e)} style={navStyle} ref={menuRef}>
                {
                    children
                }
            </nav>
        </>
    )
}