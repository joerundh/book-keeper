import { Outlet, useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [ searchParams ] = useSearchParams();
    return (
        <main>
            <h2>Search</h2>
            { searchParams.toString() ? (
                <div>
                    <p>
                        Title: {searchParams.get("title")}
                    </p>
                    <p>
                        Author: {searchParams.get("author")}
                    </p>
                </div>
            ) : (<></>) }
        </main>
    )
}