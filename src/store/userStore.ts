import { create } from "zustand"
import type { AppUser, UserFormData } from "@/types/user"
import { userService } from "@/services/userService"

interface UserState {
    users: AppUser[]
    loading: boolean
    error: string | null
    fetchUsers: () => Promise<void>
    addUser: (data: UserFormData) => Promise<AppUser>
    updateUser: (id: string, data: UserFormData) => Promise<AppUser>
    deleteUser: (id: string) => Promise<void>
    toggleUserStatus: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null })
        try {
            const users = await userService.fetchUsers()
            set({ users, loading: false })
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
        }
    },

    addUser: async (data: UserFormData) => {
        set({ loading: true, error: null })
        try {
            const newUser = await userService.createUser(data)
            set((state) => ({
                users: [...state.users, newUser],
                loading: false,
            }))
            return newUser
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },

    updateUser: async (id: string, data: UserFormData) => {
        set({ loading: true, error: null })
        try {
            const updatedUser = await userService.updateUser(id, data)
            set((state) => ({
                users: state.users.map((u) =>
                    u.id === id ? updatedUser : u
                ),
                loading: false,
            }))
            return updatedUser
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },

    deleteUser: async (id: string) => {
        set({ loading: true, error: null })
        try {
            await userService.deleteUser(id)
            set((state) => ({
                users: state.users.filter((u) => u.id !== id),
                loading: false,
            }))
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },

    toggleUserStatus: async (id: string) => {
        try {
            const updatedUser = await userService.toggleUserStatus(id)
            set((state) => ({
                users: state.users.map((u) =>
                    u.id === id ? updatedUser : u
                ),
            }))
        } catch (error) {
            set({ error: (error as Error).message })
        }
    },
}))
