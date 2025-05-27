import { Link } from "react-router-dom";
import CoverPhoto from "../components/CoverPhoto";
import InlineList from "./InlineList";
import { BookContext } from "../App";
import { useContext } from "react";

export default function ReadingListItem({ entry }) {
    const { readingList, setReadingList, removeFromReadingList, setStatus } = useContext(BookContext);

    const itemCSS = {
        listStyleType: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateAreas: `"cover info"\n"options options"`,
        gridTemplateRows: "225px auto",
        gridTemplateColumns: "150px auto",
        gap: 20
    };

    const infoCSS = {
        gridArea: "info",
        display: "flex",
        flexDirection: "column",
        gap: 10
    }

    const optionsCSS = {
        gridArea: "options",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10
    }

    const optionsButtons = status => {
        if (status === 0) {
            return [
                <button key={0} onClick={() => setStatus(entry.book, 1)}>Start reading</button>,
                <button key={1} onClick={() => setStatus(entry.book, 3)}>Cancel read</button>,
                <button key={2} onClick={() => removeFromReadingList(entry.book)}>Remove from list</button>
            ]
        } else if (status === 1) {
            return [
                <button key={0} onClick={() => setStatus(entry.book, 2)}>Finish reading</button>,
                <button key={1} onClick={() => setStatus(entry.book, 3)}>Stop reading</button>,
                <button key={2} onClick={() => removeFromReadingList(entry.book)}>Remove from list</button>
            ]
        } else if (status === 2 || status === 3) {
            return [
                <button key={0} onClick={() => setStatus(entry.book, 0)}>Plan again</button>,
                <button key={1} onClick={() => setStatus(entry.book, 1)}>Start again</button>,
                <button key={2} onClick={() => removeFromReadingList(entry.book)}>Remove from list</button>
            ]
        }
    }

    return (
        <li style={itemCSS}>
            <CoverPhoto src={entry.book.formats["image/jpeg"]} width={150} height={225} style={{ gridArea: "cover" }} />
            <div style={infoCSS}>
                <h4 style={{ width: "fit-content", textAlign: "left" }}>{entry.book.title}</h4>
                <div>by <InlineList separator=", ">
                    {
                        entry.book.authors.map((author, index) => {
                            const name = author.name.split(",").map(part => part.trim()).reverse().join(" ");
                            return <Link key={index} to={`/search?q=${encodeURI(name)}`}>{name}</Link>
                        })
                    }
                    </InlineList>
                </div>
                <p>Status: <b>{{
                    0: "Planning to read",
                    1: "Currently reading",
                    2: "Finished reading",
                    3: "Stopped reading"
                }[entry.status]}</b></p>
                {
                    entry.status === 2 ? (
                        <p>rate</p>
                    ) : (<></>)
                }
            </div>
            <div style={optionsCSS}>
                {
                    optionsButtons(entry.status)
                }
            </div>
        </li>
    )
}