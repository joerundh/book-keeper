import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SelectionInput from "../components/SelectionInput";
import SearchResults from "../components/SearchResults";

const mapToParams = map => {
    const params = new URLSearchParams();
    map.forEach((value, key) => params.append(key, value));
    return params;
}

async function searchApi(paramsMap) {
    const res = await fetch(`https://gutendex.com/books?${mapToParams(paramsMap).toString()}`);
    return await res.json();
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
    const [ searchParams ] = useSearchParams();

    const [ search, setSearch ] = useState(searchParams.get("search") || "");
    const [ topic, setTopic ] = useState("");

    const [ selectedCategories, setSelectedCategories ] = useState([]);
    useEffect(() => {
        setTopic(selectedCategories.map(category => category.toLowerCase()).join(","))
    }, [ selectedCategories ]);

    const { data, isLoading, error } = useQuery({
        queryKey: [ "bookSearch" ],
        queryFn: () => searchApi(searchParams),
        enabled: !!searchParams.size
    });

    const submitSearchForm = () => {
        if (search || topic) {
            document.querySelector("#search-form").submit();
        }
    }

    const resetSearchForm = () => {
        setSearch("");
        setSelectedCategories([]);
    }

    const searchResults = () => {
        if (!searchParams.size) return <></>
        if (isLoading) return <h3>Searching...</h3>
        if (error) return <>
            <h3>Error</h3>
            <h4>{error.message}</h4>
        </>
        return <SearchResults query={searchParams.get("search")} results={data.results} />
    }

    return (
        <>
            <h1>Search</h1>
            <form method="GET" id="search-form">
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
                    <button onClick={e => { e.preventDefault(); submitSearchForm(); }}>Search</button>
                    <button onClick={e => { e.preventDefault(); resetSearchForm(); }}>Reset</button>
                </div>
            </form>
            {
                searchResults()
            }
        </>
    )
}