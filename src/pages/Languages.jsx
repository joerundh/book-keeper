import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookContext } from "../App";
import { useContext } from "react";
import SearchResults from "../components/SearchResults";
import Paginator from "../components/Paginator";
import toCapitalized from "../modules/toCapitalized.mjs";
import LoadingIcon from "../components/LoadingIcon";

const languageSearchApi = async language => {
    const res = await fetch(`https://gutendex.com/books?languages=${language}`);
    if (!res.ok) {
        throw new Error("Unable to search for books.")
    }
    return await res.json();
}

export default function Languages() {
    const { languages } = useContext(BookContext);

    const params = useParams();
    const language = params.language || "";

    if (!language) {
        return (
            <>
                <h2>List of available languages</h2>
                <p></p>
                <ul style={{ width: "80%", margin: "0 auto" }}>
                {
                    Object.entries(languages).map(([name, code]) => (
                        <li key={code}><Link to={`/language/${code}`}>{name}</Link></li>
                    ))
                }
                </ul>
            </>
        )
    }

    if (!Object.keys(languages).includes(language)) {
        return (
            <>
                <h2>Unavailable language</h2>
                <p>Please choose another language from the list.</p>
            </>
        )
    }

    const [ searchParams ] = useSearchParams();
    const page = Number.parseInt(searchParams.get("page")) || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: [ "language", language, page ],
        queryFn: () => languageSearchApi(language),
        enabled: !!language
    });

    if (isLoading) {
        return (
            <>
                <h2>Books in {languages[language]}</h2>
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
            <h2>Books in {languages[language]}</h2>
            <Paginator route={`/language/${language}`} params={searchParams} resultsCount={data.count} />
            <SearchResults query={category} results={data.results} />
            <Paginator route={`/language/${language}`} params={searchParams} resultsCount={data.count} />
        </>
    )
}