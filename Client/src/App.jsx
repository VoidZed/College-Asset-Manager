import { useState } from 'react'
import Login from "./components/login"
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material';
import './App.css'

function App() {

  const theme = createTheme();
  return (
    <>
  <ThemeProvider theme={theme}>
    <Login/>
  </ThemeProvider>
    </>
  )
}

export default App