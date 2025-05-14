import { useSearchParams } from "react-router";

export default function SearchResults() {
    const { searchParams } = useSearchParams();
    return (
        <div>
            <p>
                Title: { searchParams.get("title") }
            </p>
            <p>
                Author: { searchParams.get("author") }
            </p>
        </div>
    )
}