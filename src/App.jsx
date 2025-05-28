import { Outlet } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

import Header from "./components/Header"
import Footer from "./components/Footer"

/*
Available categories and languages
*/

const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy"
];

const languages = {
  af: "Afrikaans",
  ar: "Arabic",
  br: "Breton",
  bg: "Bulgarian",
  ca: "Catalan",
  cs: "Czech",
  eo: "Esperanto",
  et: "Estonian",
  fy: "Western Frisian",
  gl: "Galician",
  en: "English",
  fr: "French",
  de: "German",
  he: "Hebrew",
  hu: "Hungarian",
  is: "Icelandic",
  nl: "Dutch",
  it: "Italian",
  es: "Spanish",
  pt: "Portuguese",
  ru: "Russian",
  pl: "Polish",
  lt: "Lithuanian",
  fi: "Finnish",
  no: "Norwegian",
  sv: "Swedish",
  da: "Danish",
  zh: "Chinese",
  ja: "Japanese",
  ie: "Interlingue",
  iu: "Inuktitut",
  ga: "Irish",
  ko: "Korean",
  la: "Latin",
  mi: "Maori",
  oc: "Occitan",
  fa: "Persian",
  ro: "Romanian",
  sa: "Sanskrit",
  sr: "Serbian",
  sl: "Slovenian",
  tl: "Tagalog",
  te: "Telugu",
  bo: "Tibetan",
  cy: "Welsh",
  yi: "Yiddish"
};

const formats = {
    "text/html": "HTML",
    "text/html; charset=utf-8": "HTML (UTF-8)",
    "text/html; charset=us-ascii": "HTML (US ASCII)",
    "application/epub+zip": "EPUB",
    "application/x-mobipocket-ebook": "Mobipocket",
    "text/plain; charset=us-ascii": "Plain text (US ASCII)",
    "text/plain; charset=utf-8": "Plain text (UTF-8)",
    "text/plain; charset=iso-8859-1": "Plain text (ISO/IEC 8859-1)",
    "application/rdf+xml": "RDF/XML",
    "application/octet-stream": "Octet stream"
}

/*
Contexts
*/

export const BookContext = createContext();

/*
Query clients
*/

const searchClient = new QueryClient();

function App() {
  /*
  Favourites
  */

  const [ favourites, setFavourites ] = useState(JSON.parse(localStorage.getItem("Book Keeper Favourites") || "[]"));
  useEffect(() => {
    if (favourites.length) {
      localStorage.setItem("Book Keeper Favourites", JSON.stringify(favourites));
    } else {
      localStorage.removeItem("Book Keeper Favourites")
    }
  }, [ favourites ])

  const isInFavourites = book => favourites.map(obj => JSON.stringify(obj)).includes(JSON.stringify(book));

  const addToFavourites = book => {
    if (isInFavourites(book)) return false;
    setFavourites([ ...favourites, book ]);
    return true;
  }

  const removeFromFavourites = book => {
    if (isInFavourites(book)) {
      setFavourites(favourites.filter(obj => JSON.stringify(obj) !== JSON.stringify(book)));
      if (!favourites.length) {
        localStorage.removeItem("Book Keeper Favourites");
      }
      return true;
    }
    return false;
  }

  /*
  Reading list
  */

  const [ readingList, setReadingList ] = useState(JSON.parse(localStorage.getItem("Book Keeper Reading List") || "[]"));
  useEffect(() => {
    if (readingList.length) {
      localStorage.setItem("Book Keeper Reading List", JSON.stringify(readingList));
    } else {
      localStorage.removeItem("Book Keeper Reading List")
    }
  }, [ readingList ])

  const isInReadingList = book => readingList.map(obj => JSON.stringify(obj.book)).includes(JSON.stringify(book));

  const addToReadingList = book => {
    if (isInReadingList(book)) return false;
    setReadingList([ ...readingList, {
      book: book,
      status: 0,
      timeAdded: Date.now()
    } ]);
    return true;
  }

  const removeFromReadingList = book => {
    if (isInReadingList(book)) {
      setReadingList(readingList.filter(obj => JSON.stringify(obj.book) !== JSON.stringify(book)));
      if (!readingList.length) {
        localStorage.removeItem("Book Keeper Reading List");
      }
      return true;
    }
    return false;
  }

  const setStatus = (book, newStatus) => {
    if (![ 0, 1, 2, 3 ].includes(newStatus)) {
      return false;
    }

    const copy = readingList.map(entry => entry);

    const index = copy.map(entry => entry.book).indexOf(book);
    if (index < 0) {
      return false;
    }
    if (copy[index].status === newStatus) {
      return false;
    }
    copy[index].status = newStatus;

    if (newStatus === 0) {
      copy[index] = {
        book: book,
        status: 0,
        timeAdded: Date.now()
      }
    } else if (newStatus === 1) {
      copy[index].startedReading = Date.now();
    } else if (newStatus === 2) {
      copy[index].finishedReading = Date.now();
    } else if (newStatus === 3) {
      copy[index].stoppedReading = Date.now();
    }

    setReadingList(copy);
    return true;
  }

  return (
    <>
      <BookContext.Provider value={{ favourites, isInFavourites, addToFavourites, removeFromFavourites, readingList, setReadingList, isInReadingList, addToReadingList, removeFromReadingList, setStatus, categories, languages, formats }}>
        <Header />
        <main>
          <QueryClientProvider client={searchClient}>
              <Outlet />
          </QueryClientProvider>
        </main>
      </BookContext.Provider>
    </>
  )
}

export default App
