import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import BookProfile from "../components/BookProfile";
import { StorageContext } from "../main";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../components/LoadingIcon";

const callApi = async id => {
    const res = await fetch(`https://gutendex.com/books?ids=${id}`);
    if (!res.ok) {
        throw new Error("An error occurred.")
    }
    const obj = await res.json();
    return await obj.results[0];
}

export default function Book() {
    const params = useParams();

    const [ call, setCall ] = useState(false);
    const { favBooks, readingList } = useContext(StorageContext);

    const { data, isLoading, error } = useQuery({
        queryKey: [ "book", params.id ],
        queryFn: () => callApi(params.id),
        enabled: call
    })

    if (!call) {
        const filteredFavList = favBooks.getList().map(obj => obj.value).filter(obj => obj.id === params.id);
        if (filteredFavList.length) {
            return BookProfile(filteredFavList[0]);
        } else {
            const filteredReadingList = readingList.getList().map(obj => obj.book).filter(obj => obj.id === params.id);
            if (filteredReadingList.length) {
                return BookProfile(filteredReadingList);
            } else {
                setCall(true);
            }
        }
        return (
            <>
                <div>
                    <LoadingIcon width={20} height={20} />
                    <p>Loading book profile</p>
                </div>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <LoadingIcon width={20} height={20} />
                <p>Loading book profile...</p>
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

    return BookProfile(data);
}