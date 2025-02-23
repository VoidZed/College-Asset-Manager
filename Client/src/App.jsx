import { useState } from 'react'
import Login from "./components/login"
<<<<<<< HEAD
=======
import ActivitySelection from "./components/activitySelection"
>>>>>>> 628f494a4bbaf2f8868d0c881b01ea1b59c8f2de
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material';
import './App.css'

function App() {

  const theme = createTheme();
  return (
    <>
  <ThemeProvider theme={theme}>
<<<<<<< HEAD
    <Login/>
=======
    <ActivitySelection></ActivitySelection>
>>>>>>> 628f494a4bbaf2f8868d0c881b01ea1b59c8f2de
  </ThemeProvider>
    </>
  )
}

export default App