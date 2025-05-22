import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookContext } from "../App";
import { useContext } from "react";
import SearchResults from "../components/SearchResults";
import Paginator from "../components/Paginator";
import toCapitalized from "../modules/toCapitalized.mjs";
import LoadingIcon from "../components/LoadingIcon";

const categorySearchApi = async category => {
    const res = await fetch(`https://gutendex.com/books?topic=${category}`);
    if (!res.ok) {
        throw new Error("Unable to search for books.")
    }
    return await res.json();
}

export default function Categories() {
    const { categories } = useContext(BookContext);

    const params = useParams();
    const category = params.category || "";

    if (!category) {
        return (
            <>
                <h2>List of available categories</h2>
                <p></p>
                <ul style={{ width: "80%", margin: "0 auto" }}>
                {
                    categories.map((cat, index) => (
                        <li key={index}><Link to={`/category/${cat.toLowerCase()}`}>{toCapitalized(cat)}</Link></li>
                    ))
                }
                </ul>
            </>
        )
    }

    if (!categories.includes(toCapitalized(category))) {
        return (
            <>
                <h2>Unknown category</h2>
                <p>Please choose a category from the list.</p>
            </>
        )
    }

    const [ searchParams ] = useSearchParams();
    const page = Number.parseInt(searchParams.get("page")) || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: [ "category", category, page ],
        queryFn: () => categorySearchApi(category),
        enabled: !!category
    });

    if (isLoading) {
        return (
            <>
                <h2>{toCapitalized(category)}</h2>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                    <LoadingIcon width={20} height={20} />
                    <p>Searching...</p>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h2>Error</h2>
                <p>{error.message}</p>
            </>
        )
    }

    return (
        <>
            <h2>{toCapitalized(category)}</h2>
            <Paginator route={`/category/${category}`} params={searchParams} resultsCount={data.count} />
            <SearchResults query={category} results={data.results} />
            <Paginator route={`/category/${category}`} params={searchParams} resultsCount={data.count} />
        </>
    )
}