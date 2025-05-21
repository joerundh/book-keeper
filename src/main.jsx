import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Book from './pages/Book.jsx'
import Search from './pages/Search.jsx'

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

const NoId = () => {
  return (
    <>
      <h2>No ID provided</h2>
      <p>Browse the list or do a search.</p>
    </>
  )
}

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
        path: "/list",
        element: <List />
      },
      {
        path: "/book",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <>
              <Book />
            </>
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
