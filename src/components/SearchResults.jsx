import styles from "../assets/SearchResults.module.css";
import CoverPhoto from "./CoverPhoto";
import FavouriteButton from "./FavouriteButton";

function ResultsListItem({ result }) {
    const infoCSS = {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        gridArea: "info",
        padding: 10
    }
    const optionsCSS = {
        gridArea: "options",
        padding: 10
    }
    return (
        <li className={styles.resultsListItem}>
            <div style={{ gridArea: "cover" }}>
                <CoverPhoto src={result.formats["image/jpeg"]} width={150} height={225} />
            </div>
            <div style={infoCSS}>
                <h3>{result.title}</h3>
                <h4>by {result.authors.map(obj => obj.name.split(", ").reverse().join(" ")).join(", ")}</h4>
            </div>
            <div style={optionsCSS}>
                <FavouriteButton book={result} />
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