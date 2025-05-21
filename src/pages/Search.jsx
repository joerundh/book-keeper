import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom"
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

const searchApi = async (query, categories, languages) => {
    const params = new URLSearchParams();
    if (query) {
        params.set("search", query);
    }
    if (categories) {
        params.set("topics", categories);
    }
    if (languages) {
        params.set("languages", languages);
    }
    const res = await fetch(`https://gutendex.com/books?${params.toString()}`);
    if (!res.ok) {
        throw new Error("An error occurred.");
    }
    return await res.json();
}

export default function Search() {
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get("q") || "";
    const categories = searchParams.get("categories") || "";
    const languages = searchParams.get("languages") || "";

    const { data, isLoading, error } = useQuery({
        queryKey: [ "search", query ],
        queryFn: () => searchApi(query),
        enabled: !!query || !!categories || !!languages
    });

    if (!query) {
        return (
            <SearchForm />
        )
    }
    if (isLoading) {
        return <p>Searching...</p>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <SearchResults query={query} results={data.results} />
    )
};