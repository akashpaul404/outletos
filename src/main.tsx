import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './app/router'
import { Toaster } from 'sonner'

// Initialize theme: light mode by default
const initializeTheme = () => {
  const html = document.documentElement
  
  // Remove dark class first (clear any stale state)
  html.classList.remove('dark')
  
  // Get saved preference
  const savedTheme = localStorage.getItem('theme')
  
  // If explicitly saved as dark, apply it
  if (savedTheme === 'dark') {
    html.classList.add('dark')
  } else {
    // Otherwise ensure light mode (default)
    html.classList.remove('dark')
    // Save light as default if nothing was saved
    if (!savedTheme) {
      localStorage.setItem('theme', 'light')
    }
  }
}

// Run on startup BEFORE rendering
initializeTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast: 'rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#101122] shadow-lg backdrop-blur-xl',
          description: 'text-slate-600 dark:text-slate-500',
        },
      }}
    />
    <AppRouter />
  </StrictMode>,
)
