import { useState } from "react"
import { Link } from "react-router-dom"

import styles from "../assets/Header.module.css";

export default function Header() {
    const [ searchQuery, setSearchQuery ] = useState("");

    return (
        <header style={styles.header}>
            <button className={styles.navButton}></button>
            <nav style={styles.nav}>
                <Link to="/" >Home</Link>
                <Link to="/search">Search</Link>
            </nav>
            <div className={styles.searchBar}>
                <form method="GET" action="/search">
                    <input type="text" name="q" className={styles.searchInput} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search titles, authors..." />
                    <button className={styles.submitSearch} title="Search"></button>
                </form>
            </div>
            <button className="menu"></button>
        </header>
    )
}