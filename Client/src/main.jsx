import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ActivityDisplay from "./components/activityDisplay.jsx"
import ActivityTable from './components/activityTable.jsx'
import ActivityBlog from './components/activityBlog.jsx'
import GuestLecture from './components/forms/guestLecture.jsx'
import Signup from "./components/signup.jsx"
import Login from "./components/login.jsx"
import { ThemeProvider, createTheme} from '@mui/material/styles';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.jsx'
import Techvyom from './components/forms/Techvyom.jsx'

const theme=createTheme();
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // errorElement:<ErrorPage/>,
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
      element: (<ThemeProvider theme={theme}><Login /></ThemeProvider>)
    },
    {
      path: "/signup",
      element: (<ThemeProvider theme={theme}><Signup /></ThemeProvider>)
    }
    ,
    {
      path: "/techvyom",
      element: (<ThemeProvider theme={theme}><Techvyom /></ThemeProvider>)
    }

  ]
)



createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    
      <StrictMode>
        {/* <App /> */}
      </StrictMode>
  
  </RouterProvider>
)
