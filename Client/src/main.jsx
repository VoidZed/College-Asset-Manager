import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ActivityDisplay from "./components/activityDisplay.jsx"
import ActivityTable from './components/activityTable.jsx'
import ActivityBlog from './components/activityBlog.jsx'
import GuestLecture from './components/forms/guestLecture.jsx'
import Login from "./components/login.jsx"

import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true, // Default route
          element: <Navigate to="/value_addition" replace />,
        },
        {
          path: "/:activity_name",
          element: <ActivityDisplay />
        }
        ,
        {
          path: "/:activity_name/:activity_item",
          element: <ActivityTable />
        }
        ,
        {
          path: "/:activity_name/:activity_item/:post_id",
          element: <ActivityBlog />
        },
        
        {
          path: "/:activity_name/add/:activity_item",
          element: <GuestLecture />
        },




      ]
    },
   
    {
      path: "/login",
      element: <Login />
    }
  ]
)

// const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    
      <StrictMode>
        {/* <App /> */}
      </StrictMode>
  
  </RouterProvider>
)
