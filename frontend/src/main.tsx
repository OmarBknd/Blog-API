import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from './components/DarkTheme'
import { Toaster } from 'react-hot-toast'
import './index.css'

import App from './App'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App/>
    <Toaster/>
    </ThemeProvider>
    
  </StrictMode>,
)
