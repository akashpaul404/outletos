import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { AppUser, UserFormData, UserRole } from "@/types/user"

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "manager", "staff"]),
  status: z.enum(["active", "inactive"]),
})

type FormSchema = z.infer<typeof userSchema>

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: AppUser | null
  onSubmit: (data: UserFormData) => Promise<void>
  isLoading?: boolean
  currentUserRole?: string
}

export default function UserForm({
  open,
  onOpenChange,
  user,
  onSubmit,
  isLoading = false,
  currentUserRole,
}: UserFormProps) {
  const isAdmin = currentUserRole === "admin"
  const isManager = currentUserRole === "manager"

  // Determine which roles can be assigned
  const availableRoles: UserRole[] = isAdmin
    ? ["admin", "manager", "staff"]
    : isManager
      ? ["manager", "staff"]
      : []

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "staff",
      status: user?.status || "active",
    },
  })

  const status = watch("status")

  // Reset form when user changes
  React.useEffect(() => {
    if (open) {
      reset({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "staff",
        status: user?.status || "active",
      })
    }
  }, [open, user, reset])

  const handleFormSubmit = async (data: FormSchema) => {
    await onSubmit(data as UserFormData)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">
            {user ? "Edit User" : "Create New User"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name</Label>
            <Input
              id="name"
              placeholder="Enter user name"
              {...register("name")}
              disabled={isLoading}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-primary/50"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              disabled={isLoading}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-primary/50"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-700 dark:text-slate-300">Role</Label>
            <Select
              id="role"
              {...register("role")}
              disabled={isLoading || availableRoles.length === 0}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </Select>
            {errors.role && (
              <p className="text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status" className="text-slate-700 dark:text-slate-300">Active Status</Label>
            <Switch
              checked={status === "active"}
              onCheckedChange={(checked) =>
                setValue("status", checked ? "active" : "inactive")
              }
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="btn-gradient">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {user ? "Updating..." : "Creating..."}
                </>
              ) : (
                user ? "Update" : "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
