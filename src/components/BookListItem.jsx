import { Link } from "react-router-dom";
import styles from "../assets/SearchResults.module.css";
import CoverPhoto from "./CoverPhoto";
import FavouriteButton from "./FavouriteButton";
import ReadingListButton from "./ReadingListButton";
import InlineList from "./InlineList";
import { BookContext } from "../App";
import { useContext } from "react";
import fetchCategories from "../modules/fetchCategories.mjs";

export default function BookListItem({ book }) {
    const { categories, languages } = useContext(BookContext);

    const fetchedCategories = fetchCategories(categories, [ ...book.subjects, ...book.bookshelves ]);
    
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
                <CoverPhoto src={book.formats["image/jpeg"]} width={150} height={225} />
            </div>
            <div style={infoCSS}>
                <Link to={`/book/${book.id}`}>
                    <h3>{book.title}</h3>
                </Link>
                <div>
                    by <InlineList separator={", "}>
                        {
                            book.authors.map((author, index) => {
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
                                        <Link key={index} to={`/category/${category.toLowerCase()}`}>{category}</Link>
                                    ))
                                }
                            </InlineList>
                        </div>
                    ) : (<></>)
                }
                {
                    book.languages ? (
                        <div>
                            <h4>Languages:</h4>
                            <InlineList separator={", "}>
                                {
                                    book.languages.map((lang, index) => (
                                        <Link key={index} to={`/language/${lang}`}>{languages[lang]}</Link>
                                    ))
                                }
                            </InlineList>
                        </div>
                    ) : (<></>)
                }
            </div>
            <div style={optionsCSS}>
                <FavouriteButton book={book} />
                <ReadingListButton book={book} />
            </div>
        </li>
    )
}