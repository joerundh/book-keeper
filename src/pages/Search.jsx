import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom"
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Paginator from "../components/Paginator";
import LoadingIcon from "../components/LoadingIcon";

const searchApi = async (params) => {
    const res = await fetch(`https://gutendex.com/books?${params.toString()}`);
    if (!res.ok) {
        throw new Error("An error occurred.");
    }
    return await res.json();
}

export default function Search() {
    const [ searchParams ] = useSearchParams();

    const page = searchParams.get("page") || 1;
    const query = searchParams.get("q") || "";
    const categories = searchParams.get("categories") || "";
    const languages = searchParams.get("languages") || "";

    const params = new URLSearchParams();
    if (page) {
        params.set("page", page);
    }
    if (query) {
        params.set("search", query);
    }
    if (categories) {
        params.set("topic", categories.map(str => str.toLowerCase()).join(","));
    }
    if (languages) {
        params.set("languages", languages.join(","));
    }

    const { data, isLoading, error } = useQuery({
        queryKey: [ "search", page, query, categories, languages ],
        queryFn: () => searchApi(params),
        enabled: !!query || !!categories || !!languages
    });

    const loadingCSS = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    }

    if (!query && !categories && !languages) {
        return (
            <SearchForm />
        )
    }
    if (isLoading) {
        return <div style={loadingCSS}>
            <LoadingIcon width={20} height={20} />
            <p>Searching...</p>
        </div>
    }
    if (error) {
        return <p>{error.message}</p>
    }

    const resultsPerPage = 32;

    const firstResult = (page - 1)*resultsPerPage + 1;
    const lastResult = page*resultsPerPage > data.count ? data.count : page*resultsPerPage;

    return (
        <>
            <h2>Search results{query ? ` for "${query}"` : ""}</h2>
            <h4>Showing results {firstResult} - {lastResult} out of {data.count}</h4>
            <Paginator params={searchParams} resultsCount={data.count} />
            <SearchResults query={query} results={data.results} />
            <Paginator params={searchParams} resultsCount={data.count} />
        </>
    )
};