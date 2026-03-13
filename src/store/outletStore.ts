import { create } from "zustand"
import type { Outlet, OutletFormData } from "@/types/outlet"
import { outletService } from "@/services/outletService"

interface OutletState {
    outlets: Outlet[]
    loading: boolean
    error: string | null
    fetchOutlets: () => Promise<void>
    addOutlet: (data: OutletFormData) => Promise<Outlet>
    updateOutlet: (id: string, data: OutletFormData) => Promise<Outlet>
    deleteOutlet: (id: string) => Promise<void>
}

export const useOutletStore = create<OutletState>((set, get) => ({
    outlets: [],
    loading: false,
    error: null,

    fetchOutlets: async () => {
        set({ loading: true, error: null })
        try {
            const outlets = await outletService.fetchOutlets()
            set({ outlets, loading: false })
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
        }
    },

    addOutlet: async (data: OutletFormData) => {
        set({ loading: true, error: null })
        try {
            const newOutlet = await outletService.createOutlet(data)
            set((state) => ({
                outlets: [...state.outlets, newOutlet],
                loading: false,
            }))
            return newOutlet
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },

    updateOutlet: async (id: string, data: OutletFormData) => {
        set({ loading: true, error: null })
        try {
            const updatedOutlet = await outletService.updateOutlet(id, data)
            set((state) => ({
                outlets: state.outlets.map((o) =>
                    o.id === id ? updatedOutlet : o
                ),
                loading: false,
            }))
            return updatedOutlet
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },

    deleteOutlet: async (id: string) => {
        set({ loading: true, error: null })
        try {
            await outletService.deleteOutlet(id)
            set((state) => ({
                outlets: state.outlets.filter((o) => o.id !== id),
                loading: false,
            }))
        } catch (error) {
            set({ error: (error as Error).message, loading: false })
            throw error
        }
    },
}))
