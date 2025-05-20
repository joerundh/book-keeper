import { Link } from "react-router-dom";
import CoverPhoto from "./CoverPhoto";
import styles from "../assets/BookProfile.module.css";

export default function BookProfile(book) {
    const authorNames = book.authors.map(author => author.name);

    return (
        <div className={styles.bookProfile}>
            <CoverPhoto src={book.formats["image/jpeg"]} style={{ gridArea: "cover" }} />
            <div className={styles.info}>
                <h2 style={{ width: "fit-content" }}>{book.title}</h2>
                <p>by {
                    authorNames.map((name, index) => (
                        <Link key={index} to={`/search?q=${encodeURI(name)}`} title="Search for author">{name}</Link>
                    ))
                }</p>
            </div>
            {
                book.summaries.length ? (<p style={{ gridArea: "summary" }}>{book.summaries[0]}</p>) : (<></>)
            }
        </div>
    )
}