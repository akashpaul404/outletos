import { Navigate, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuthStore } from "@/store/authStore"

interface ProtectedRouteProps {
    children: ReactNode
    requiredRole?: "admin" | "manager" | "staff"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const location = useLocation()

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requiredRole && user?.role !== requiredRole) {
        // For role-based access, redirect to dashboard if not authorized
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
