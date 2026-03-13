import { toast as sonnerToast } from 'sonner'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  description?: string
  duration?: number
}

const defaultOptions: ToastOptions = {
  duration: 4000,
}

export function toast(type: ToastType, message: string, options?: ToastOptions) {
  const mergedOptions = { ...defaultOptions, ...options }

  switch (type) {
    case 'success':
      sonnerToast.success(message, {
        description: options?.description,
        duration: mergedOptions.duration,
      })
      break
    case 'error':
      sonnerToast.error(message, {
        description: options?.description,
        duration: mergedOptions.duration,
      })
      break
    case 'warning':
      sonnerToast.warning(message, {
        description: options?.description,
        duration: mergedOptions.duration,
      })
      break
    case 'info':
    default:
      sonnerToast.info(message, {
        description: options?.description,
        duration: mergedOptions.duration,
      })
      break
  }
}

// Convenience methods
export const success = (message: string, options?: ToastOptions) => 
  toast('success', message, options)

export const error = (message: string, options?: ToastOptions) => 
  toast('error', message, options)

export const warning = (message: string, options?: ToastOptions) => 
  toast('warning', message, options)

export const info = (message: string, options?: ToastOptions) => 
  toast('info', message, options)

export const promise = <T>(
  promise: Promise<T>,
  messages: {
    loading?: string
    success?: string | ((data: T) => string)
    error?: string | ((error: Error) => string)
  }
) => {
  return sonnerToast.promise(promise, {
    loading: messages.loading || 'Loading...',
    success: (data) => {
      if (typeof messages.success === 'function') {
        return messages.success(data)
      }
      return messages.success || 'Success!'
    },
    error: (err) => {
      if (typeof messages.error === 'function') {
        return messages.error(err)
      }
      return messages.error || 'Something went wrong'
    },
  })
}
