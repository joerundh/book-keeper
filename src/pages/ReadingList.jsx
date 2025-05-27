import { BookContext } from "../App"
import { useContext, useState, useEffect } from "react"
import ReadingListItem from "../components/ReadingListItem";
import InlineList from "../components/InlineList";

export default function ReadingList() {
    const { readingList } = useContext(BookContext);

    const [ view, setView ] = useState(JSON.parse(localStorage.getItem("Book Keeper Reading List View") || `{ "0": true, "1": true, "2": true, "3": true }`));
    useEffect(() => {
        if (Object.is(view, { 0: true, 1: true, 2: true, 3: true })) {
            localStorage.removeItem("Book Keeper Reading List View");
        } else {
            localStorage.setItem("Book Keeper Reading List View", JSON.stringify(view));
        }
    }, [ view ]);

    const [ sort, setSort ] = useState(JSON.parse(localStorage.getItem("Book Keeper Reading List Sort") || "0"));
    useEffect(() => {
        if (sort) {
            localStorage.setItem("Book Keeper Reading List Sort", `${sort}`);
        } else {
            localStorage.removeItem("Book Keeper Reading List Sort");
        }
    }, [ sort ]);

    const sortFn = [
        {
            label: "Title, A-Z",
            fn: (entry1, entry2) => entry1.book.title.localeCompare(entry2.book.title)
        },
        {
            label: "Title, Z-A",
            fn: (entry1, entry2) => entry2.book.title.localeCompare(entry1.book.title)
        },
        {
            label: "Author, A-Z",
            fn: (entry1, entry2) => entry1.book.authors[0].name.localeCompare(entry2.book.authors[0].name)
        },
        {
            label: "Author, Z-A",
            fn: (entry1, entry2) => entry2.book.authors[0].name.localeCompare(entry1.book.authors[0].name)
        },
        {
            label: "Status",
            fn: (entry1, entry2) => entry1.status - entry2.status
        },
        {
            label: "Status, reversed",
            fn: (entry1, entry2) => entry2.status - entry1.status
        },
        {
            label: "Time added",
            fn: (entry1, entry2) => entry1.timeAdded - entry2.timeAdded
        },
        {
            label: "Time added, reversed",
            fn: (entry1, entry2) => entry2.timeAdded - entry1.timeAdded
        }
    ]

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

    const list = readingList.filter(entry => view[entry.status]).sort((entry1, entry2) => sortFn[sort].fn(entry1, entry2))

    return (
        <>
            <div style={componentCSS}>
                <h2 style={{ gridArea: "header", width: "100%" }}>My Reading List</h2>
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
                    <label>Sort by: <select defaultValue={sort} onChange={e => setSort(Number.parseInt(e.target.value))} style={{ padding: 3 }}>
                        {
                            sortFn.map((obj, index) => (
                                <option key={index} value={index}>{obj.label}</option>
                            ))
                        }
                    </select></label>
                </div>
                <ul style={listCSS}>
                    {
                        list.length ? list.map((entry, index) => (
                            <ReadingListItem key={index} entry={entry} /> 
                        )) : <p style={{ textAlign: "center" }}>(No items.)</p>
                    }
                </ul>
            </div>
        </>
    )
}