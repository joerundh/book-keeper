import { useContext, useEffect, useState } from "react";
import SelectionInput from "./SelectionInput";
import { BookContext } from "../App";
import Collapsible from "./Collapsible";
import styles from "../assets/SearchForm.module.css";

const filterSelection = obj => {
    return Object.entries(obj).filter(([key, value]) => value ).map(([key, value]) => key);
}

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
    const [ categorySelection, setCategorySelection ] = useState(initialCategorySelection);

    const initialLanguageSelection = {}
    languages.forEach(language => {
        initialLanguageSelection[language.key] = false;
    })
    const [ languageSelection, setLanguageSelection ] = useState(initialLanguageSelection);

    /*
    Button click event handlers
    */

    const handleSubmit = e => {
        e.preventDefault();
        const selectedCategories = filterSelection(categorySelection);
        const selectedLanguages = filterSelection(languageSelection);
        if (query || selectedCategories.length || selectedLanguages.length) {
            const formData = new FormData();
            if (query) {
                formData.append("q", query);
            }
            if (selectedCategories.length) {
                formData.append("categories", selectedCategories);
            }
            if (selectedLanguages.length) {
                formData.append("languages", selectedLanguages);
            }

            
        }
    }

    const resetSearchForm = () => {
        setQuery("");
        setCategorySelection([])
        setLanguageSelection([]);
    }

    return (
        <>
            <h3>Search</h3>
            <form onSubmit={e => handleSubmit(e)} className={styles.searchForm}>
                <div className={styles.textInputLine}>
                    <input type="text" name="q" value={query} onChange={e => setQuery(e.target.value)} style={{ width: 300, padding: 5}} />
                    <button>Search</button>
                    <button onClick={e => { e.preventDefault(); resetSearchForm(); }}>Reset</button>
                </div>
                <Collapsible header="Categories" view={false}>
                    <SelectionInput options={categories} selection={categorySelection} selectionSetter={setCategorySelection} />
                </Collapsible>
                <Collapsible header="Languages" view={false}>
                    <SelectionInput options={languages} selection={languageSelection} selectionSetter={setLanguageSelection} />
                </Collapsible>
            </form>
        </>
    )
}