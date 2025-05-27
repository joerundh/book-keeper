import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import BookProfile from "../components/BookProfile";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../components/LoadingIcon";
import { BookContext } from "../App";

const callApi = async id => {
    const res = await fetch(`https://gutendex.com/books?ids=${id}`);
    if (!res.ok) {
        throw new Error("Could not fetch data.")
    }
    const obj = await res.json();
    return await obj.results[0];
}

export default function Book() {
    const params = useParams();

    const [ call, setCall ] = useState(false);
    const { favourites, readingList } = useContext(BookContext);

    const { data, isLoading, error } = useQuery({
        queryKey: [ "book", params.id ],
        queryFn: () => callApi(params.id),
        enabled: call
    })

    const loadingScreen = () => (
        <>
            <div>
                <LoadingIcon width={20} height={20} />
                <p>Loading book profile...</p>
            </div>
        </>
    );

    if (!call) {
        const favouritesIndex = favourites.map(obj => obj.id).indexOf(params.id);
        if (favouritesIndex < 0) {
            const readingListIndex = readingList.map(obj => obj.id).indexOf(params.id);
            if (readingListIndex < 0) {
                setCall(true);
                return loadingScreen();
            } else {
                return <BookProfile book={filteredReadingList[0]} />;
            }
        } else {
            return <BookProfile book={filteredFavList[0]} />;
        }
    }

    if (isLoading) {
        return loadingScreen();
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
        <BookProfile book={data} />
    );
}