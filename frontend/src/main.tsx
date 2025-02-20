import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from './components/DarkTheme'
import './index.css'

import App from './App'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App/>
    </ThemeProvider>
    
  </StrictMode>,
)
