import styles from "./SearchResults.module.css";

function ResultsListItem({ result }) {
    console.log(result)
    return (
        <li className={styles.resultsListItem}>
            <div className="cover">
                <img src={result.formats["image/jpeg"]} />
            </div>
            <div>

            </div>
            <div>

            </div>
        </li>
    )
}

export default function SearchResults({ query, results }) {
    if (!results) return <></>;
    if (!results.length) return (
        <h4>No results found for "{query}".</h4>
    )
    return (
        <ul className={styles.resultsList}>
            {
                results.map((result, index) => <ResultsListItem key={index} result={result} />)
            }
        </ul>
    )
}