import { Link } from "react-router-dom";
import styles from "../assets/SearchResults.module.css";
import CoverPhoto from "./CoverPhoto";
import FavouriteButton from "./FavouriteButton";
import ReadingListButton from "./ReadingListButton";
import InlineList from "./InlineList";
import { BookContext } from "../App";
import { useContext } from "react";
import fetchCategories from "../modules/fetchCategories.mjs";

function ResultsListItem({ result }) {
    const { categories, languages } = useContext(BookContext);

    const fetchedCategories = fetchCategories(categories, [ ...result.subjects, ...result.bookshelves ]);
    
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
                <div>
                    by <InlineList separator={", "}>
                        {
                            result.authors.map((author, index) => {
                                const name = author.name.split(",").map(part => part.trim()).reverse().join(" ");
                                return (
                                    <Link key={index} to={`/search?${new URLSearchParams([[ "q", name ]]).toString()}`} style={{ textWrap: "nowrap" }}>{name}</Link>
                                )
                            })
                        }
                    </InlineList>
                </div>
                {
                    fetchedCategories.length ? (
                        <div>
                            <h4>Categories:</h4>
                            <InlineList separator={", "}>
                                {
                                    fetchedCategories.map((category, index) => (
                                        <Link key={index} to={`/search?topic=${category.toLowerCase()}`}>{category}</Link>
                                    ))
                                }
                            </InlineList>
                        </div>
                    ) : (<></>)
                }
                <div>
                    <h4>Languages:</h4>
                    <InlineList separator={", "}>
                        {
                            result.languages.map((lang, index) => (
                                <Link key={index} to={`/search?languages=${lang.toLowerCase()}`}>{languages.filter(arr => arr.key === lang)[0].value}</Link>
                            ))
                        }
                    </InlineList>
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
        <h4>No results found{ query ? ` for "${query}"` : "" }.</h4>
    )
    return (
        <>
            <ul className={styles.resultsList}>
            {
                results.map((result, index) => <ResultsListItem key={index} result={result} />)
            }
            </ul>
        </>
    )
}