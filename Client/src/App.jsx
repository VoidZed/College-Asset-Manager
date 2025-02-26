import { useState } from 'react'
import Login from "./components/login"
import Signup from "./components/signup"
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material';
import './App.css'
import ActivitySelection from "./components/activitySelection"
function App() {

  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>



        <ActivitySelection></ActivitySelection>

        {/* <Login></Login> */}
        {/* <Signup></Signup> */}

      </ThemeProvider>
    </>
  )
}

export default App