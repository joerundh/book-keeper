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
    const { favBooks, readingList } = useContext(BookContext);

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
        const filteredFavList = favBooks.getList().map(obj => obj.value).filter(obj => obj.id === params.id);
        if (filteredFavList.length) {
            return (
                <BookProfile book={filteredFavList[0]} />
            );
        } else {
            const filteredReadingList = readingList.getList().map(obj => obj.book).filter(obj => obj.id === params.id);
            if (filteredReadingList.length) {
                return (
                    <BookProfile book={filteredReadingList[0]} />
                );
            } else {
                setCall(true);
            }
        }
        return loadingScreen();
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