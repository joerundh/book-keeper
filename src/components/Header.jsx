import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header() {
    const [ search, setSearch ] = useState("");

    return (
        <header>
            <div>
                <form method="get">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <button></button>
                </form>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
            </nav>
        </header>
    )
}