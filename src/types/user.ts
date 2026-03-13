export type UserRole = "admin" | "manager" | "staff"

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: "active" | "inactive"
  createdAt: string
}

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  status: "active" | "inactive"
}
