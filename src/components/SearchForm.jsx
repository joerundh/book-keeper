import { useEffect, useState } from "react";
import SelectionInput from "./SelectionInput";

const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy"
];

export default function SearchForm() {
    const [ search, setSearch ] = useState("")
    const [ topic, setTopic ] = useState("");

    const [ selectedCategories, setSelectedCategories ] = useState([]);
    useEffect(() => {
        setTopic(selectedCategories.map(category => category.toLowerCase()).join(","))
    }, [ selectedCategories ]);


    const submitSearchForm = () => {
        if (search || topic) {
            document.querySelector("#search-form").submit();
        }
    }

    const resetSearchForm = () => {
        setSearch("");
        setSelectedCategories([]);
    }

    return (
        <>
            <form method="GET" action="/search" id="search-form">
                <div>
                    <h3>Search:</h3>
                    <input type="text" name="q" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div>
                    <h3>Categories:</h3>
                    <input type="hidden" name="topic" value={topic} />
                    <SelectionInput selection={selectedCategories} options={categories} setter={setSelectedCategories} />
                </div>
                <p></p>
                <div>
                    <button onClick={e => { e.preventDefault(); submitSearchForm(); }}>Search</button>
                    <button onClick={e => { e.preventDefault(); resetSearchForm(); }}>Reset</button>
                </div>
            </form>
        </>
    )
}