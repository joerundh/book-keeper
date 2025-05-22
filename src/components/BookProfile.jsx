import { Link } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "../App";
import CoverPhoto from "./CoverPhoto";
import InlineList from "./InlineList";
import fetchCategories from "../modules/fetchCategories.mjs";
import styles from "../assets/BookProfile.module.css";
import FavouriteButton from "./FavouriteButton";
import ReadingListButton from "./ReadingListButton";

export default function BookProfile({ book }) {
    const { categories, languages, formats } = useContext(BookContext);
    const fetchedCategories = fetchCategories(categories, [ ...book.subjects, ...book.bookshelves ]);

    return (
        <div className={styles.bookProfile}>
            <CoverPhoto src={book.formats["image/jpeg"]} style={{ gridArea: "cover" }} />
            <div className={styles.info}>
                <h2 style={{ width: "fit-content", textAlign: "left" }}>{book.title}</h2>
                <div>
                    by <InlineList separator={", "}>
                        {
                            book.authors.map((author, index) => {
                                const name = author.name.split(",").map(part => part.trim()).reverse().join(" ");
                                return (
                                    <Link key={index} to={`/search?${new URLSearchParams([[ "q", name ]]).toString()}`} title="Search for author" style={{ textWrap: "nowrap" }}>{name}</Link>
                                )
                            })
                        }
                    </InlineList>
                </div>
                {
                    fetchedCategories.length ? (
                        <div>
                            <p>Categories:</p>
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
                {
                    book.languages ? (
                        <div>
                            <p>Languages:</p>
                            <InlineList separator={", "}>
                                {
                                    book.languages.map((lang, index) => (
                                        <Link key={index} to={`/search?languages=${lang}`}>{languages[lang]}</Link>
                                    ))
                                }
                            </InlineList>
                        </div>
                    ) : (<></>)
                }
                <p>Number of downloads: <b>{book["download_count"]}</b></p>
                <p>Gutendex ID: <b>{book.id}</b></p>
            </div>
            <div className={styles.options}>
                <FavouriteButton book={book} />
                <ReadingListButton book={book} />
            </div>
            <div className={styles.summary}>
                <h4 style={{ width: "100%", textAlign: "left" }}>Summary</h4>
                {
                    book.summaries.length ? (
                        <p>{book.summaries[0]}</p>
                    ) : (
                        <p>No summary available.</p>
                    )
                }
            </div>
            <div className={styles.formats}>
                <h4 style={{ textAlign: "left" }}>Available formats</h4>
                <ul>
                    {
                        Object.entries(book.formats).filter(([key, value]) => Object.keys(formats).includes(key)).map(([key, value]) => (
                            <li key={key} style={{ listStyleType: "none" }}>{formats[key]}: <a href={value}>{value}</a></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}