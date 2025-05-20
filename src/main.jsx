import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Book from './pages/Book.jsx'
import Search from './pages/Search.jsx'

import Storage from './modules/Storage.mjs'
import ReadingList from './modules/ReadingList.mjs'

import './index.css'
import App from './App.jsx'

const searchClient = new QueryClient();
const bookClient = new QueryClient();

const favBooks = new Storage("fav-books");
const favAuthors = new Storage("fav-authors");
const favCategories = new Storage("fav-categories");

const readingList = new ReadingList();

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

export const StorageContext = createContext();
export const CategoryContext = createContext();

const NotFound = () => {
  return (
    <>
      <h2>404 Not found</h2>
    </>
  )
};

const Error = () => {
  return (
    <>
      <h3>Oh no!</h3>
      <h4>An error occured somewhere! Try something else.</h4>
    </>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/list",
        element: <>
          <CategoryContext.Provider value={{ categories }}>
            <List />
          </CategoryContext.Provider>
        </>
      },
      {
        path: "/book",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <>
                <QueryClientProvider client={bookClient}>
                  <CategoryContext.Provider value={{ categories }}>
                    <Book />
                  </CategoryContext.Provider>
                </QueryClientProvider>
              </>
          },
          {
            index: true,
            element: <>
              <h2>No ID provided</h2>
              <p>Browse the list or do a search.</p>
            </>
          }
        ]
      },
      {
        path: "/search",
        element: <>
          <QueryClientProvider client={searchClient}>
            <CategoryContext.Provider value={{ categories }}>
              <Search />
            </CategoryContext.Provider>
          </QueryClientProvider>
        </>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StorageContext.Provider value={{ favBooks, favAuthors, favCategories, readingList }}>
      <RouterProvider router={router} />
    </StorageContext.Provider>
  </StrictMode>,
)
