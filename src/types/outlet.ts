export type OutletStatus = "active" | "inactive" | "pending"

export interface Outlet {
    id: string
    name: string
    location: string
    revenue: number
    status: OutletStatus
    createdAt: string
}

export interface OutletFormData {
    name: string
    location: string
    revenue: number
    status: OutletStatus
}
