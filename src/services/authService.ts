type Role = "admin" | "manager" | "staff"

interface MockUser {
    id: string
    name: string
    email: string
    role: Role
}

export const loginRequest = async (email: string, password: string): Promise<MockUser> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock credentials
    const mockUsers: Record<string, MockUser> = {
        "admin@outletos.com": {
            id: "1",
            name: "Admin User",
            email: "admin@outletos.com",
            role: "admin",
        },
        "manager@outletos.com": {
            id: "2",
            name: "Manager User",
            email: "manager@outletos.com",
            role: "manager",
        },
        "staff@outletos.com": {
            id: "3",
            name: "Staff User",
            email: "staff@outletos.com",
            role: "staff",
        },
    }

    const user = mockUsers[email]

    if (user && password === "123456") {
        return user
    }

    throw new Error("Invalid credentials")
}
