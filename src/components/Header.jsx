import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import DropDownMenu from './DropDownMenu.jsx'
import { useNavigate } from "react-router-dom";

import styles from "../assets/Header.module.css";

import { BookContext } from "../App.jsx";
import DropDownLink from "./DropDownLink.jsx";



export default function Header() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const { categories } = useContext(BookContext)

    return (
        <header style={styles.header}>
            <DropDownMenu title="Menu" closedIcon="../assets/menu-icon.png" openIcon="../assets/close-icon.png" side={"left"}>
                <DropDownLink to="/">Home</DropDownLink>
                <DropDownLink to="/search">Advanced Search</DropDownLink>
                <DropDownLink to="/categories">Categories:</DropDownLink>
                <ul>
                    {
                        categories.map((category, index) => (
                            <li key={index}>
                                <DropDownLink key={index} to={`/category/${category.toLowerCase()}`}>{category}</DropDownLink>
                            </li>
                        ))
                    }
                </ul>
                <DropDownLink to="/languages">Languages</DropDownLink>
            </DropDownMenu>
            <div className={styles.searchBar}>
                <form method="GET" action="/search">
                    <input type="text" name="q" className={styles.searchInput} title="Enter a search query" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search titles, authors..." />
                    <button className={styles.submitSearch} title="Search"></button>
                </form>
            </div>
            <DropDownMenu title="Profile" closedIcon="../assets/profile-icon.png" openIcon="../assets/close-icon.png" side={"right"}>
                <DropDownLink to="/favourites">My Favourites</DropDownLink>
                <DropDownLink to="/readinglist">My Reading List</DropDownLink>
            </DropDownMenu>
        </header>
    )
}