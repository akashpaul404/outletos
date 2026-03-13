import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './app/router'
import { Toaster } from 'sonner'

// Initialize theme: light mode by default
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  const root = document.documentElement
  
  if (savedTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Run on startup
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
