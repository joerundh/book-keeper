import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SelectionInput from "../components/SelectionInput";

const mapToParams = map => {
    const params = new URLSearchParams();
    map.forEach((key, value) => params.append(key, value));
    return params;
}

async function searchApi(paramsMap) {
    if (q) {
        const res = await fetch(`https://gutendex.com/books?search=${mapToParams(paramsMap).toString()}}`);
    }
    return [];
}

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

export default function Search() {
    const [ search, setSearch ] = useState("");
    const [ topic, setTopic ] = useState("");

    const [ selectedCategories, setSelectedCategories ] = useState([]);
    useEffect(() => {
        setTopic(selectedCategories.map(category => category.toLowerCase()).join(","))
    }, [ selectedCategories ])

    const [ searchParams ] = useSearchParams();

    const { data, isLoading, error } = useQuery({
        queryKey: [ "bookSearch" ],
        queryFn: searchApi,
        enabled: !!searchParams.size
    });

    const resetSearchForm = () => {
        setSearch("");
        setSelectedCategories([]);
    }

    return (
        <>
            <h1>Search</h1>
            <form method="GET">
                <div>
                    <h3>Search:</h3>
                    <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div>
                    <h3>Categories:</h3>
                    <input type="hidden" name="topic" value={topic} />
                    <SelectionInput selection={selectedCategories} options={categories} setter={setSelectedCategories} />
                </div>
                <p></p>
                <div>
                    <button>Search</button>
                    <button onClick={e => { e.preventDefault(); resetSearchForm(); }}>Reset</button>
                </div>
            </form>
        </>
    )
}