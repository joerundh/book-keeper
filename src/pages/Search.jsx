import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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

export default function Search() {
    const [ searchParams ] = useSearchParams();
    const { data, isLoading, error } = useQuery({
        queryKey: "bookSearch",
        queryFn: searchApi,
        enabled: !!searchParams.size
    });
    return (
        <h1>Search</h1>
    )
}