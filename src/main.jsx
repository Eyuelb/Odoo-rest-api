import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainThemeProvider } from '@themeManagment'
import App from './App'
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainThemeProvider>
        <App />
    </MainThemeProvider>
  </React.StrictMode>, 
)
