import { useState } from "react";
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
    const [ searchCategories, setSearchCategories ] = useState([]);

    const [ searchParams ] = useSearchParams();
    const { data, isLoading, error } = useQuery({
        queryKey: "bookSearch",
        queryFn: searchApi,
        enabled: !!searchParams.size
    });
    return (
        <>
            <h1>Search</h1>
            <h3>Categories:</h3>
            <SelectionInput selection={searchCategories} options={categories} setter={setSearchCategories} />
        </>
    )
}