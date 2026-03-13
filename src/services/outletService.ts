import type { Outlet, OutletFormData, OutletStatus } from "@/types/outlet"

// Mock data
let mockOutlets: Outlet[] = [
    {
        id: "1",
        name: "Downtown Cafe",
        location: "New York, NY",
        revenue: 12400,
        status: "active",
        createdAt: "2026-01-15",
    },
    {
        id: "2",
        name: "Beach Restaurant",
        location: "Miami, FL",
        revenue: 8200,
        status: "active",
        createdAt: "2026-02-20",
    },
    {
        id: "3",
        name: "Mountain Lodge",
        location: "Denver, CO",
        revenue: 5600,
        status: "pending",
        createdAt: "2026-03-10",
    },
    {
        id: "4",
        name: "City Bistro",
        location: "Chicago, IL",
        revenue: 15300,
        status: "active",
        createdAt: "2026-01-05",
    },
    {
        id: "5",
        name: "Harbor View",
        location: "Seattle, WA",
        revenue: 0,
        status: "inactive",
        createdAt: "2026-02-28",
    },
    {
        id: "6",
        name: "Sunset Grill",
        location: "Los Angeles, CA",
        revenue: 9800,
        status: "active",
        createdAt: "2026-03-15",
    },
    {
        id: "7",
        name: "Riverside Cafe",
        location: "Austin, TX",
        revenue: 7200,
        status: "active",
        createdAt: "2026-01-22",
    },
    {
        id: "8",
        name: "Garden Terrace",
        location: "Portland, OR",
        revenue: 4500,
        status: "pending",
        createdAt: "2026-03-01",
    },
]

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const outletService = {
    async fetchOutlets(): Promise<Outlet[]> {
        await delay(500)
        return [...mockOutlets]
    },

    async createOutlet(data: OutletFormData): Promise<Outlet> {
        await delay(500)
        const newOutlet: Outlet = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString().split("T")[0],
        }
        mockOutlets.push(newOutlet)
        return newOutlet
    },

    async updateOutlet(id: string, data: OutletFormData): Promise<Outlet> {
        await delay(500)
        const index = mockOutlets.findIndex((o) => o.id === id)
        if (index === -1) throw new Error("Outlet not found")

        mockOutlets[index] = {
            ...mockOutlets[index],
            ...data,
        }
        return mockOutlets[index]
    },

    async deleteOutlet(id: string): Promise<void> {
        await delay(500)
        const index = mockOutlets.findIndex((o) => o.id === id)
        if (index === -1) throw new Error("Outlet not found")
        mockOutlets.splice(index, 1)
    },
}
