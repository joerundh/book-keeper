import { BookContext } from "../App"
import { useContext, useState, useEffect } from "react"
import BookListItem from "../components/BookListItem";
import InlineList from "../components/InlineList";

export default function Favourites() {
    const { favourites, isInReadingList } = useContext(BookContext);

    const [ view, setView ] = useState(JSON.parse(localStorage.getItem("Book Keeper Favourites View") || `{ "0": true, "1": true }`));
    useEffect(() => {
        if (Object.is(view, { 0: true, 1: true })) {
            localStorage.removeItem("Book Keeper Favourites View");
        } else {
            localStorage.setItem("Book Keeper Favourites View", JSON.stringify(view));
        }
    }, [ view ]);

    const [ sort, setSort ] = useState(JSON.parse(localStorage.getItem("Book Keeper Favourites Sort") || "0"));
    useEffect(() => {
        if (sort) {
            localStorage.setItem("Book Keeper Favourites Sort", `${sort}`);
        } else {
            localStorage.removeItem("Book Keeper Favourites Sort");
        }
    }, [ sort ]);

    const sortFn = [
        {
            label: "Title, A-Z",
            fn: (book1, book2) => book1.title.localeCompare(book2.title)
        },
        {
            label: "Title, Z-A",
            fn: (book1, book2) => book2.title.localeCompare(book1.title)
        },
        {
            label: "Author, A-Z",
            fn: (book1, book2) => book1.authors[0].name.localeCompare(book2.authors[0].name)
        },
        {
            label: "Author, Z-A",
            fn: (book1, book2) => book2.authors[0].name.localeCompare(book1.authors[0].name)
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

    const viewBook = book => {
        return (isInReadingList(book) && view[0]) || (!isInReadingList(book) && view[1]);
    }

    return (
        <>
            <div style={componentCSS}>
                <h2 style={{ gridArea: "header", width: "100%" }}>My Favourites</h2>
                <div style={viewCSS}>
                    <p>View:</p>
                    <InlineList separator=" ">
                        <label><input type="checkbox" checked={view[0]} onChange={e => toggleCheckbox(e, 0)} /> In reading list</label>
                        <label><input type="checkbox" checked={view[1]} onChange={e => toggleCheckbox(e, 1)} /> Not in reading list</label>
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
                        favourites.length ? favourites.filter(book => viewBook(book)).sort((book1, book2) => sortFn[sort].fn(book1, book2)).map((book, index) => (
                            <BookListItem key={index} book={book} /> 
                        )) : <p style={{ textAlign: "center" }}>(No favourites.)</p>
                    }
                </ul>
            </div>
        </>
    )
}