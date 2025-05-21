import { useContext, useEffect, useState } from "react";
import SelectionInput from "./SelectionInput";
import { BookContext } from "../App";
import Collapsible from "./Collapsible";

export default function SearchForm() {
    /*
    Available categories and languages from context
    */

    const { categories, languages } = useContext(BookContext);

    /*
    States for query, categories and languages
    */

    const [ query, setQuery ] = useState("");

    const initialCategorySelection = {};
    categories.forEach(category => {
        initialCategorySelection[category] = false;
    });
    const [ selectedCategories, setSelectedCategories ] = useState(initialCategorySelection);
    const [ showCategories, setShowCategories ] = useState(false);

    const initialLanguageSelection = {}
    languages.forEach(language => {
        initialLanguageSelection[language.key] = false;
    })
    const [ selectedLanguages, setSelectedLanguages ] = useState(initialLanguageSelection);
    const [ showLanguages, setShowLanguages ] = useState(false);

    /*
    Button click event handlers
    */

    const submitSearchForm = () => {
        if (search || selectedCategories.length || selectedLanguages.length) {
            
        }
    }

    const resetSearchForm = () => {
        setQuery("");
        setSelectedCategories([])
        setSelectedLanguages([]);
    }

    const searchFormCSS = {
        display: "flex",
        flexDirection: "column",
        gap: 10
    }

    return (
        <>
            <h3>Search</h3>
            <div style={{searchFormCSS}}>
                <div>
                    <input type="text" name="q" value={query} onChange={e => setQuery(e.target.value)} style={{ width: 400, padding: 2}} />
                    <button onClick={e => { e.preventDefault(); submitSearch(); }}>Search</button>
                    <button onClick={e => { e.preventDefault(); resetSearch(); }}>Reset</button>
                </div>
                <Collapsible header="Categories" view={false}>
                    <SelectionInput options={categories} selection={selectedCategories} selectionSetter={setSelectedCategories} />
                </Collapsible>
                <Collapsible header="Languages" view={false}>
                    <SelectionInput options={languages} selection={selectedLanguages} selectionSetter={setSelectedLanguages} />
                </Collapsible>
            </div>
        </>
    )
}