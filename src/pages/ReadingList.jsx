import { BookContext } from "../App"
import { useContext, useState } from "react"
import ReadingListItem from "../components/ReadingListItem";
import InlineList from "../components/InlineList";

export default function ReadingList() {
    const { readingList, isInReadingList, removeFromReadingList } = useContext(BookContext);

    const [ view, setView ] = useState({ 0: true, 1: true, 2: true, 3: true });

    const toggleCheckbox = (e, status) => {
        const newView = Object.assign({}, view);
        newView[status] = !newView[status];
        setView(newView);
    }

    const componentCSS = {
        width: "100%",
        display: "grid",
        gridTemplateAreas: `"header header"\n"view sort"\n"list list"`,
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "auto auto auto",
        gap: 20
    }

    const viewCSS = {
        gridArea: "view",
        display: "grid",
        placeContent: "center"
    }
    const sortCSS = {
        gridArea: "sort",
        display: "grid",
        placeContent: "center"
    }

    const listCSS = {
        gridArea: "list",
        margin: 0,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 20
    }

    return (
        <>
            <div style={componentCSS}>
                <h2 style={{ gridArea: "header", width: "100%" }}>My reading list</h2>
                <div style={viewCSS}>
                    <p>View:</p>
                    <InlineList separator=" ">
                        <label><input type="checkbox" checked={view[0]} onChange={e => toggleCheckbox(e, 0)} /> Planning to read</label>
                        <label><input type="checkbox" checked={view[1]} onChange={e => toggleCheckbox(e, 1)} /> Currently reading</label>
                        <label><input type="checkbox" checked={view[2]} onChange={e => toggleCheckbox(e, 2)} /> Finished reading</label>
                        <label><input type="checkbox" checked={view[3]} onChange={e => toggleCheckbox(e, 3)} /> Stopped reading</label>
                    </InlineList>
                </div>
                <div style={sortCSS}>
                    <p>sort</p>
                </div>
                <ul style={listCSS}>
                    {
                        readingList.length ? readingList.map((entry, index) => (
                            <ReadingListItem key={index} entry={entry} /> 
                        )) : <p></p>
                    }
                </ul>
            </div>
        </>
    )
}