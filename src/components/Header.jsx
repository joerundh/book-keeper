import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import DropDownMenu from './DropDownMenu.jsx'
import { useNavigate } from "react-router-dom";

import styles from "../assets/Header.module.css";

import { BookContext } from "../App.jsx";

export default function Header() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const { categories } = useContext(BookContext)

    const navigate = useNavigate();

    const linkClick = e => {
        e.preventDefault();
        navigate(new URL(e.target.href).pathname);
    }

    return (
        <header style={styles.header}>
            <DropDownMenu title="Menu" iconAsset={"menu-icon.png"} side={"left"}>
                <a href="/" onClick={e => linkClick(e)}>Home</a>
                <a href="/search" onClick={e => linkClick(e)}>Search</a>
                <a href="/categories" onClick={e => linkClick(e)}>Categories:</a>
                <ul>
                    {
                        categories.map((category, index) => (
                            <li key={index}>
                                <a href={`/category/${category.toLowerCase()}`} onClick={e => linkClick(e)}>{category}</a>
                            </li>
                        ))
                    }
                </ul>
                <a href="/languages">Languages</a>
            </DropDownMenu>
            <div className={styles.searchBar}>
                <form method="GET" action="/search">
                    <input type="text" name="q" className={styles.searchInput} title="Enter a search query" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search titles, authors..." />
                    <button className={styles.submitSearch} title="Search"></button>
                </form>
            </div>
            <DropDownMenu title="Profile" iconAsset={"profile-icon.png"} side={"right"}>
                <a href="/favourites" onClick={e => linkClick(e)}>My favourites</a>
                <a href="reading" onClick={e => linkClick(e)}>My reading list</a>
            </DropDownMenu>
        </header>
    )
}