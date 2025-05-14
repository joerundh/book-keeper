import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import './index.css'
import App from './App.jsx'
import Storage from './modules/Storage.mjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const favBooks = new Storage("fav-books");
const favAuthors = new Storage("fav-authors");
const favCats = new Storage("fav-categories");
const readingList = new Storage("reading-list");
const StorageContext = createContext();

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
      <h2>An error occured.</h2>
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
    <StorageContext.Provider value={{ favBooks: favBooks, favAuthors: favAuthors, favCats: favCats, readingList: readingList }}>
      <RouterProvider router={router} />
    </StorageContext.Provider>
  </StrictMode>,
)
