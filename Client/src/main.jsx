
import { StrictMode, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Provider } from "react-redux"
import { routes } from './utils/formsRoutes.jsx'
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from './store/store.jsx'

// Core components (keep these non-lazy for critical UI)
import App from './App.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import AdminRoute from "./components/admin/adminProtectedRoute.jsx"
import Home from "./components/home.jsx"

// Loading component for suspense fallback
import { CircularProgress, Box } from '@mui/material'

// Lazy loaded components
const ActivityDisplay = lazy(() => import('./components/activityDisplay.jsx'))
const ActivityTable = lazy(() => import('./components/activityTable.jsx'))
const ActivityBlog = lazy(() => import('./components/activityBlog.jsx'))
const GuestLecture = lazy(() => import('./components/forms/guestLecture.jsx'))
const Signup = lazy(() => import('./components/signup.jsx'))
const Login = lazy(() => import('./components/login.jsx'))
const UserProfile = lazy(() => import("./components/profile.jsx"))
const Developer = lazy(() => import("./components/designedBy.jsx"))

// Admin components (lazy loaded)
const AdminPage = lazy(() => import('./components/admin/adminActivitySelection.jsx'))
const EmailPage = lazy(() => import('./components/admin/emailSetting.jsx'))
const UserPage = lazy(() => import('./components/admin/userSetting.jsx'))
const FormBuild = lazy(() => import("./components/admin/formBuilder.jsx"))

const ListForm = lazy(() => import("./components/admin/listForms.jsx"))
const FormRender = lazy(() => import("./components/admin/formRender.jsx"))



const theme = createTheme();

// Loading fallback component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
)

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // errorElement:<ErrorPage/>,
      children: [
        {
          index: true, // Default route
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <UserProfile />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/developer",
          element: (
            // <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Developer />
              </Suspense>
            // </ProtectedRoute>
          )
        },
        {
          path: "/:activity_name",
          element: (
            // <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ActivityDisplay />
            </Suspense>
            // </ProtectedRoute>
          )
        },
        {
          path: "/:activity_name/:activity_item",
          element: (
            // <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ActivityTable />
            </Suspense>
            // </ProtectedRoute>
          )
        },
        {
          path: "/:activity_name/:activity_item/:post_id",
          element: (
            // <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ActivityBlog />
            </Suspense>
            // </ProtectedRoute>
          )
        },
        ...routes,
        {
          path: "/:activity_name/add/:activity_item",
          element: (
            // <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <GuestLecture />
            </Suspense>
            // </ProtectedRoute>
          )
        },


        // add dynamic routes
        {
          path: "/:activity_name/add_dynamic/:activity_item",
          element: (
            // <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <FormRender />
            </Suspense>
            // </ProtectedRoute>
          )
        },
      ]
    },
    {
      path: "/login",
      element: (
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        </ThemeProvider>
      )
    },
    {
      path: "/signup",
      element: (
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingFallback />}>
            <Signup />
          </Suspense>
        </ThemeProvider>
      )
    },

    // admin page
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <Suspense fallback={<LoadingFallback />}>
            <AdminPage />
          </Suspense>
        </AdminRoute>
      ),
      children: [
        {
          index: true, // Default route
          element: <Navigate to="/admin/email" replace />,
        },
        {
          path: "email",
          element: (
            <AdminRoute>
              <Suspense fallback={<LoadingFallback />}>
                <EmailPage />
              </Suspense>
            </AdminRoute>
          )
        },
        {
          path: "users",
          element: (
            <AdminRoute>
              <Suspense fallback={<LoadingFallback />}>
                <UserPage />
              </Suspense>
            </AdminRoute>
          )
        },
        {
          path: "addForm",
          element: (
            <AdminRoute>
              <Suspense fallback={<LoadingFallback />}>
                <FormBuild />
              </Suspense>
            </AdminRoute>
          )
        },

        {
          path: "listForm",
          element: (
            <AdminRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ListForm />
              </Suspense>
            </AdminRoute>
          )
        },

      ]
    },
    {
      path: '/home',
      element: <Home />
    }

  ]
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingFallback />} persistor={persistor}>
      <RouterProvider router={router}>
        <StrictMode>
          {/* <App /> */}
        </StrictMode>
      </RouterProvider>
    </PersistGate>
  </Provider>
)