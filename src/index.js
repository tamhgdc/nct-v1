import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async'
import { StyledEngineProvider } from '@mui/material'
import { StoreProvider } from 'store'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <StyledEngineProvider injectFirst>
          <App />
          <ToastContainer />
        </StyledEngineProvider>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
)
