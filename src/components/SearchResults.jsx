export default function SearchResults({ query, results }) {
    if (!results) return <></>;
    if (!results.length) return (
        <h4>No results found for "{query}"</h4>
    )
    return (
        <ul>
            {
                results.map((result, index) => (
                    <li key={index} style={{ listStyleType: "none" }}>
                        <h3>{result.title}</h3>
                    </li>
                ))
            }
        </ul>
    )
}