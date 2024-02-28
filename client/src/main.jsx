import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import ItemList from './routes/ItemList.jsx';
import MyList from './routes/MyList.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/items",
        element: <ItemList/>
      },
      {
        path: "/items/mine/:userId",
        element: <MyList/>
      }
    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
