import styles from "../assets/SearchResults.module.css";
import CoverPhoto from "./CoverPhoto";
import LoadingIcon from "./LoadingIcon";

function ResultsListItem({ result }) {
    return (
        <li className={styles.resultsListItem}>
            <CoverPhoto src={result.formats["image/jpeg"]} width={150} height={225} />
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