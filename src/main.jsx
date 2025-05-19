import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import BookProfile from './pages/BookProfile'
import Search from './pages/Search.jsx'

import Storage from './modules/Storage.mjs'
import ReadingList from './modules/ReadingList.mjs'

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

const favBooks = new Storage("fav-books");
const favAuthors = new Storage("fav-authors");
const favCategories = new Storage("fav-categories");

const readingList = new ReadingList();

export const StorageContext = createContext();

const NotFound = () => {
  return (
    <>
      <h3>404 Not found</h3>
    </>
  )
};

const Error = () => {
  return (
    <>
      <h3>Oh no!</h3>
      <h4>An error occured somwhere! Try something else.</h4>
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
        element: <List />
      },
      {
        path: "/book",
        element: <>
          <p>Choose a book to view</p>
        </>,
        children: [
          {
            path: ":id",
            element: <BookProfile />
          },
          {
            path: "*",
            element: <>
              <h1>Error</h1>
              <p>No book chosen.</p>
            </>
          }
        ]
      },
      {
        path: "/search",
        element: <>
          <QueryClientProvider client={queryClient}>
            <Search />
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
    <StorageContext.Provider value={{ favBooks, favAuthors, favCategories }}>
      <RouterProvider router={router} />
    </StorageContext.Provider>
  </StrictMode>,
)
