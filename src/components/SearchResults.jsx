import { Link } from "react-router-dom";
import styles from "../assets/SearchResults.module.css";
import CoverPhoto from "./CoverPhoto";
import FavouriteButton from "./FavouriteButton";
import ReadingListButton from "./ReadingListButton";

const authorLink = (author, index) => {
    return (
        <Link to={`/search?q=${encodeURI(name)}`}>{name}</Link>
    );
}

function ResultsListItem({ result }) {
    const infoCSS = {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        gridArea: "info",
    };
    const optionsCSS = {
        gridArea: "options",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
    };
    return (
        <li className={styles.resultsListItem}>
            <div style={{ gridArea: "cover" }}>
                <CoverPhoto src={result.formats["image/jpeg"]} width={150} height={225} />
            </div>
            <div style={infoCSS}>
                <Link to={`/book/${result.id}`}>
                    <h3>{result.title}</h3>
                </Link>
                <h4>by {
                    result.authors.map((author, index, arr) => {
                        const name = author.name.split(",").map(part => part.trim()).reverse().join(" ")
                        return (
                            <>
                                <Link key={index} to={`/search?q=${encodeURI(name)}`}>{name}</Link>{index === arr.length - 1 ? "" : ", "}
                            </>
                        );
                    })
                }</h4>
                <div>
                    <h4>Categories:</h4>
                </div>
                <div>
                    <h4>Languages:</h4>
                </div>
            </div>
            <div style={optionsCSS}>
                <FavouriteButton book={result} />
                <ReadingListButton book={result} />
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