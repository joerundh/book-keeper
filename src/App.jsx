import { Outlet } from "react-router-dom"
import { createContext } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

import Header from "./components/Header"
import Footer from "./components/Footer"

import Storage from './modules/Storage.mjs'
import ReadingList from './modules/ReadingList.mjs'

/*
Local storage objects
*/

const favBooks = new Storage("fav-books");
const favCategories = new Storage("fav-categories");

const readingList = new ReadingList();

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

const languages = [
  { key: "en", value: "English" },
  { key: "fr", value: "French" },
  { key: "de", value: "German" },
  { key: "nl", value: "Dutch" },
  { key: "es", value: "Spanish" },
  { key: "it", value: "Italian" },
  { key: "el", value: "Greek" },
  { key: "pt", value: "Portuguese" },
  { key: "ru", value: "Russian" },
  { key: "pl", value: "Polish" },
  { key: "no", value: "Norwegian" },
  { key: "tu", value: "Turkish" },
  { key: "sv", value: "Swedish" },
  { key: "da", value: "Danish" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ar", value: "Arabic" },
]

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
  return (
    <>
      <Header />
      <main>
        <QueryClientProvider client={searchClient}>
          <BookContext.Provider value={{ favBooks, favCategories, readingList, categories, languages, formats }}>
            <Outlet />
          </BookContext.Provider>
        </QueryClientProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
