
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

// Loading component for suspense fallback
import { CircularProgress, Box } from '@mui/material'

// Lazy loaded components
const ActivityDisplay = lazy(() => import('./components/activityDisplay.jsx'))
const ActivityTable = lazy(() => import('./components/activityTable.jsx'))
const ActivityBlog = lazy(() => import('./components/activityBlog.jsx'))
const GuestLecture = lazy(() => import('./components/forms/guestLecture.jsx'))
const Signup = lazy(() => import('./components/signup.jsx'))
const Login = lazy(() => import('./components/login.jsx'))

// Admin components (lazy loaded)
const AdminPage = lazy(() => import('./components/admin/adminActivitySelection.jsx'))
const EmailPage = lazy(() => import('./components/admin/emailSetting.jsx'))
const UserPage = lazy(() => import('./components/admin/userSetting.jsx'))
const FormBuild = lazy(() => import("./components/admin/formBuilder.jsx"))
const FormView = lazy(() => import("./components/admin/formRender.jsx"))
const ListForm = lazy(() => import("./components/admin/listForms.jsx"))
const FormRender = lazy(() => import("./components/admin/formRender.jsx"))

// Test component
const Test = lazy(() => import('./components/testComponent.jsx'))

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
          element: <Navigate to="/r&d_cell" replace />,
        },
        {
          path: "/:activity_name",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ActivityDisplay />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/:activity_name/:activity_item",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ActivityTable />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/:activity_name/:activity_item/:post_id",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ActivityBlog />
              </Suspense>
            </ProtectedRoute>
          )
        },
        ...routes,
        {
          path: "/:activity_name/add/:activity_item",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <GuestLecture />
              </Suspense>
            </ProtectedRoute>
          )
        },


        // add dynamic routes
        {
          path: "/:activity_name/add_dynamic/:activity_item",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <FormRender />
              </Suspense>
            </ProtectedRoute>
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
        <Suspense fallback={<LoadingFallback />}>
          <AdminPage />
        </Suspense>
      ),
      children: [
        {
          index: true, // Default route
          element: <Navigate to="/admin/email" replace />,
        },
        {
          path: "email",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <EmailPage />
            </Suspense>
          )
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <UserPage />
            </Suspense>
          )
        },
        {
          path: "addForm",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <FormBuild />
            </Suspense>
          )
        },
        {
          path: "viewForm",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <FormView />
            </Suspense>
          )
        },
        {
          path: "listForm",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ListForm />
            </Suspense>
          )
        },

      ]
    },
    {
      path: "/test",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Test />
        </Suspense>
      )
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