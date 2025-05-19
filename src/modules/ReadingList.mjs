import toKebabCase from "./toKebabCase.mjs";

export default function ReadingList(str) {
    const kebabCase = toKebabCase(str);
    const prefix = kebabCase.match(/[a-z]/g) ? kebabCase : "my-app";

    const list = JSON.parse(localStorage.getItem(`${prefix}-reading-list`) || "[]");

    const saveList = () => {
        if (list) {
            // Store the list in local storage if it contains any objects
            localStorage.setItem(`${prefix}-reading-list`, JSON.stringify(list));
        } else {
            // The list is empty, so it may as well be removed from 
            // the local storage
            localStorage.removeItem(`${prefix}-reading-list`)
        }
    }

    this.addBook = function(book) {
        /*
        If a book object with the same ID as the provided book object is contained
        in the list, false is returned, as repeats are to be avoided. Otherwise, 
        the provided object is added to the list, the list is saved, and true
        is returned.
        */
        if (list.map(obj => obj.book.id).includes(book.id)) {
            // Return false without addition if (presumably) the book object is already
            // stored
            return false;
        }
        /*
        Create an object which contains the book object, a status code and a timestap
        */
        const obj = { status: 0, book: book, timeAdded: Date.now() };
        list.push(obj);
        saveList();
    }

    this.removeBook = function(bookId) {
        /*
        If a book with the give book ID is stored, it is removed from the list 
        using indexOf and splice (as list is a constant variable)
        */
        const index = list.map(obj => obj.book.id).indexOf(bookId);
        if (index >= 0) {
            list.splice(index, 1);
            saveList();
            return true;
        }
        return false;
    }

    this.getAllBooks = function() {
        return list;
    }

    this.getAllBooksByStatus = function(status) {
        return list.filter(obj => obj.status === status);
    }
}