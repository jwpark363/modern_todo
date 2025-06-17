import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Reset } from 'styled-reset'
import { ThemeProvider } from 'styled-components'
import { todoTheme } from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={todoTheme}>
      <Reset />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
