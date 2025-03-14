import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Provider } from "react-redux"
import ProtectedRoute from './components/protectedRoute.jsx'
import { routes } from './utils/formsRoutes.jsx'


// forms
import ActivityDisplay from "./components/activityDisplay.jsx"
import ActivityTable from './components/activityTable.jsx'
import ActivityBlog from './components/activityBlog.jsx'
import GuestLecture from './components/forms/guestLecture.jsx'
import Signup from "./components/signup.jsx"
import Login from "./components/login.jsx"


// admin page
import AdminPage from "./components/admin/adminActivitySelection.jsx"
import EmailPage from "./components/admin/emailSetting.jsx"
import UserPage from "./components/admin/userSetting.jsx"

//redux 
import store, { persistor } from './store/store.jsx'
import { PersistGate } from "redux-persist/integration/react";

import Test from "./components/testComponent.jsx"


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
          element: <Navigate to="/r&d_cell" replace />,
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
        ...routes,

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

    },
     // admin page
     {
      path: "/admin",
      element: <AdminPage />,
      children:[
        {
          index: true, // Default route
          element: <Navigate to="/admin/email" replace />,
        },
        {
          path:"email",
          element: <EmailPage />
        },
        {
          path:"users",
          element: <UserPage />
        }
      ]
    },

    {
      path: "/test",
      element:<Test/>
    }

   

   





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