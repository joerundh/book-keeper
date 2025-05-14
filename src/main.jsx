import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import SearchResults from './pages/SearchResults.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import './index.css'
import App from './App.jsx'
import Storage from './modules/Storage.mjs'

/*
const favBooks = new Storage("fav-books");
const favAuthors = new Storage("fav-authors");
const favCats = new Storage("fav-categories");
const readingList = new Storage("reading-list");
*/

const StorageContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StorageContext.Provider value={{ favBooks: favBooks, favAuthors: favAuthors, favCats: favCats, readingList: readingList }}>
      <RouterProvider router={router} />
    </StorageContext.Provider>
  </StrictMode>,
)
