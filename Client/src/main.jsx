import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Provider } from "react-redux"
import ProtectedRoute from './components/protectedRoute.jsx'




// forms
import ActivityDisplay from "./components/activityDisplay.jsx"
import ActivityTable from './components/activityTable.jsx'
import ActivityBlog from './components/activityBlog.jsx'
import GuestLecture from './components/forms/guestLecture.jsx'
import Signup from "./components/signup.jsx"
import Login from "./components/login.jsx"


import ErrorPage from './components/ErrorPage.jsx'
import Techvyom from './components/forms/techvyom.jsx'
// import Zest from "./components/forms/zest.jsx"



//redux 
import store, { persistor } from './store/store.jsx'
import { PersistGate } from "redux-persist/integration/react";


const theme = createTheme();
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
          element: (
            <ProtectedRoute>
              <ActivityDisplay />
            </ProtectedRoute>
          )

        }
        ,
        {
          path: "/:activity_name/:activity_item",
          element: (
            <ProtectedRoute>
              <ActivityTable />
            </ProtectedRoute>
          )
        }
        ,
        {
          path: "/:activity_name/:activity_item/:post_id",
          element: (
            <ProtectedRoute>
              <ActivityBlog />
            </ProtectedRoute>
          )
        },

        {
          path: "/:activity_name/add/:activity_item",
          element: (
            <ProtectedRoute>
              <GuestLecture />
            </ProtectedRoute>
          )
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
    // ,
    // {
    //   path: "/zest",
    //   element:<Zest/>
    // }
  

  ]
)



createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>

        <StrictMode>
          {/* <App /> */}
        </StrictMode>

      </RouterProvider>
    </PersistGate>
  </Provider>
)
