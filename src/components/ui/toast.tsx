import * as React from "react"
import { cn } from "@/utils/cn"

interface ToastProps {
    message: string
    type?: "error" | "success"
    onClose?: () => void
}

export function Toast({ message, type = "error", onClose }: ToastProps) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 z-50 rounded-lg px-4 py-3 shadow-lg",
                type === "error" ? "bg-destructive text-destructive-foreground" : "bg-green-600 text-white"
            )}
        >
            <p className="text-sm font-medium">{message}</p>
        </div>
    )
}
