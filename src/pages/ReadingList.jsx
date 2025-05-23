import BookListItem from "../components/BookListItem"
import { BookContext } from "../App"
import { useContext, useState } from "react"

export default function ReadingList() {
    const [ viewing, setViewing ] = useState(0);

    return (
        <>
            <h2>My reading list</h2>
            <div>
                <label>
                    Sublist: <select onChange={e => console.log(e.target.value)}>
                        <option value={0}>Planning to read</option>
                        <option value={1}>Currently reading</option>
                        <option value={2}>Finished reading</option>
                        <option value={3}>Stopped reading</option>
                    </select>
                </label>
            </div>
            <div>
                {

                }
            </div>
        </>
    )
}