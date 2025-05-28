import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Categories from './pages/Categories.jsx'
import Languages from './pages/Languages.jsx'
import Book from './pages/Book.jsx'
import Search from './pages/Search.jsx'
import Favourites from './pages/Favourites.jsx';
import ReadingList from './pages/ReadingList.jsx'

import './index.css'
import App from './App.jsx'

/*
Standard error elements
*/

const NotFound = () => {
  return (
    <>
      <h2>404 Not found</h2>
    </>
  )
};

const NoId = () => (
  <>
    <h2>No ID provided</h2>
    <p>Browse the list or do a search.</p>
  </>
)

const Error = () => {
  return (
    <>
      <h2>Oh no!</h2>
      <p>An error occured somewhere! Try something else.</p>
    </>
  )
};

/*
Router
*/

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
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/category",
        element: <Outlet />,
        children: [
          {
            path: ":category",
            element: <Categories />
          },
          {
            index: true,
            element: <Categories />
          }
        ]
      },
      {
        path: "/languages",
        element: <Languages />
      },
      {
        path: "/language",
        element: <Outlet />,
        children: [
          {
            path: ":language",
            element: <Languages />
          },
          {
            index: true,
            element: <Languages />
          }
        ]
      },
      {
        path: "/book",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <Book />
          },
          {
            index: true,
            element: <NoId />
          }
        ]
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/favourites",
        element: <Favourites />
      },
      {
        path: "/readinglist",
        element: <ReadingList />
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
    <RouterProvider router={router} />
  </StrictMode>,
)
