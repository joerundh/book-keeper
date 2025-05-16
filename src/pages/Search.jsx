import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom"
import SearchResults from "../components/SearchResults";

const searchApi = async query => {
    const params = new URLSearchParams();
    params.set("search", query);
    const res = await fetch(`https://gutendex.com/books?${params.toString()}`);
    if (!res.ok) {
        throw new Error("An error occurred.");
    }
    return await res.json();
}

export default function Search() {
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get("q") || "";

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: [ "search", query ],
        queryFn: () => searchApi(query),
        enabled: !!query
    });
    if (!query) {
        navigate("/advanced");
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