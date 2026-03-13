import { create } from "zustand"

type Role = "admin" | "manager" | "staff"

interface User {
    id: string
    name: string
    email: string
    role: Role
}

interface AuthState {
    user: User | null
    token: string | null
    login: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),

    login: (user) => {
        const fakeToken = "outletos-token-123"
        localStorage.setItem("token", fakeToken)
        localStorage.setItem("user", JSON.stringify(user))
        set({ user, token: fakeToken })
    },

    logout: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        set({ user: null, token: null })
    },
}))
