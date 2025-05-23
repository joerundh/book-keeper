import styles from "../assets/SearchResults.module.css";
import BookListItem from "./BookListItem";

export default function SearchResults({ query, results }) {
    if (!results) return <></>;
    if (!results.length) return (
        <h4>No results found{ query ? ` for "${query}"` : "" }.</h4>
    )
    return (
        <>
            <ul className={styles.resultsList}>
            {
                results.map((result, index) => <BookListItem key={index} book={result} />)
            }
            </ul>
        </>
    )
}