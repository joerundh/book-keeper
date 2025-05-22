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

const languages = {
  en: "English",
  fr: "French",
  de: "German",
  nl: "Dutch",
  es: "Spanish",
  it: "Italian",
  es: "Spanish",
  pt: "Portuguese",
  ru: "Russian",
  pl: "Polish",
  no: "Norwegian",
  tu: "Turkish",
  sv: "Swedish",
  da: "Danish",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic"
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
