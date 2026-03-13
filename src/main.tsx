import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './app/router'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast: 'rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#101122] shadow-lg backdrop-blur-xl',
          description: 'text-slate-500 dark:text-slate-400',
        },
      }}
    />
    <AppRouter />
  </StrictMode>,
)
