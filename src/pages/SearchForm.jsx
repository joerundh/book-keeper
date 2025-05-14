import { Outlet, useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [ searchParams ] = useSearchParams();
    return (
        <main>
            <h2>Search</h2>
            { searchParams.size ? (
                <div>
                    {
                        Array.from(searchParams.entries()).map(([ key, value ], index) => {
                            return (
                                <p key={index}>
                                    {key}: {value}
                                </p>
                            )
                        })
                    }
                </div>
            ) : (
                <p>
                    Enter search parameters
                </p>
            ) }
        </main>
    )
}