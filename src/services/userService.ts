import type { AppUser, UserFormData } from "@/types/user"

// Mock data
let mockUsers: AppUser[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@outletos.com",
        role: "admin",
        status: "active",
        createdAt: "2026-01-01",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@outletos.com",
        role: "manager",
        status: "active",
        createdAt: "2026-01-15",
    },
    {
        id: "3",
        name: "Mike Chen",
        email: "mike@outletos.com",
        role: "staff",
        status: "active",
        createdAt: "2026-02-01",
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily@outletos.com",
        role: "manager",
        status: "active",
        createdAt: "2026-02-10",
    },
    {
        id: "5",
        name: "James Wilson",
        email: "james@outletos.com",
        role: "staff",
        status: "inactive",
        createdAt: "2026-02-20",
    },
    {
        id: "6",
        name: "Lisa Anderson",
        email: "lisa@outletos.com",
        role: "staff",
        status: "active",
        createdAt: "2026-03-01",
    },
    {
        id: "7",
        name: "David Brown",
        email: "david@outletos.com",
        role: "manager",
        status: "active",
        createdAt: "2026-03-05",
    },
    {
        id: "8",
        name: "Jennifer Taylor",
        email: "jennifer@outletos.com",
        role: "staff",
        status: "active",
        createdAt: "2026-03-10",
    },
    {
        id: "9",
        name: "Robert Martinez",
        email: "robert@outletos.com",
        role: "staff",
        status: "inactive",
        createdAt: "2026-03-15",
    },
    {
        id: "10",
        name: "Amanda White",
        email: "amanda@outletos.com",
        role: "staff",
        status: "active",
        createdAt: "2026-03-20",
    },
]

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const userService = {
    async fetchUsers(): Promise<AppUser[]> {
        await delay(500)
        return [...mockUsers]
    },

    async createUser(data: UserFormData): Promise<AppUser> {
        await delay(500)
        const newUser: AppUser = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString().split("T")[0],
        }
        mockUsers.push(newUser)
        return newUser
    },

    async updateUser(id: string, data: UserFormData): Promise<AppUser> {
        await delay(500)
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index === -1) throw new Error("User not found")

        mockUsers[index] = {
            ...mockUsers[index],
            ...data,
        }
        return mockUsers[index]
    },

    async deleteUser(id: string): Promise<void> {
        await delay(500)
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index === -1) throw new Error("User not found")
        mockUsers.splice(index, 1)
    },

    async toggleUserStatus(id: string): Promise<AppUser> {
        await delay(300)
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index === -1) throw new Error("User not found")

        mockUsers[index] = {
            ...mockUsers[index],
            status: mockUsers[index].status === "active" ? "inactive" : "active",
        }
        return mockUsers[index]
    },
}
