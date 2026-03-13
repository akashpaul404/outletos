import { useState, useEffect } from 'react'

/**
 * Hook to show a loading state with a minimum delay
 * Useful for preventing skeleton flash when data loads instantly
 */
export function useLoading(delay = 300) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), delay)
        return () => clearTimeout(timer)
    }, [delay])

    return isLoading
}

/**
 * Hook to handle async operations with loading state
 */
export function useAsync<T>(asyncFn: () => Promise<T>, immediate = true) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [data, setData] = useState<T | null>(null)

    const execute = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await asyncFn()
            setData(result)
            return result
        } catch (e) {
            const err = e instanceof Error ? e : new Error('Unknown error')
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [])

    return { loading, error, data, execute }
}
