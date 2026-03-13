import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AppUser } from "@/types/user"
import RoleBadge from "./RoleBadge"

interface UserTableProps {
    users: AppUser[]
    currentUserId?: string
    currentUserRole?: string
    onEdit: (user: AppUser) => void
    onDelete: (user: AppUser) => void
    onToggleStatus: (user: AppUser) => void
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

function getAvatarColor(name: string): string {
    const colors = [
        "bg-indigo-500/20 text-indigo-400",
        "bg-blue-500/20 text-blue-400",
        "bg-purple-500/20 text-purple-400",
        "bg-pink-500/20 text-pink-400",
        "bg-emerald-500/20 text-emerald-400",
        "bg-amber-500/20 text-amber-400",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
}

export default function UserTable({
    users,
    currentUserId,
    currentUserRole,
    onEdit,
    onDelete,
    onToggleStatus,
}: UserTableProps) {
    // Permission checks
    const isAdmin = currentUserRole === "admin"
    const isManager = currentUserRole === "manager"

    const canEdit = (user: AppUser): boolean => {
        if (isAdmin) return true
        if (isManager && user.role !== "admin") return true
        return false
    }

    const canDelete = (user: AppUser): boolean => {
        if (user.id === currentUserId) return false // Can't delete yourself
        if (isAdmin) return true
        if (isManager && user.role === "staff") return true
        return false
    }

    const canToggleStatus = (user: AppUser): boolean => {
        if (user.id === currentUserId) return false // Can't toggle yourself
        if (isAdmin) return true
        if (isManager && user.role === "staff") return true
        return false
    }

    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-left">
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                User
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Role
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Status
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Created
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="border-b border-slate-200/80 dark:border-white/5 last:border-0 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${getAvatarColor(
                                                user.name
                                            )}`}
                                        >
                                            {getInitials(user.name)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-6 py-4">
                                    <Switch
                                        checked={user.status === "active"}
                                        onCheckedChange={() => onToggleStatus(user)}
                                        disabled={!canToggleStatus(user)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                    {user.createdAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass-card border-slate-200 dark:border-white/10">
                                            <DropdownMenuItem
                                                onClick={() => onEdit(user)}
                                                disabled={!canEdit(user)}
                                                className="text-slate-600 dark:text-slate-300 focus:bg-slate-100/80 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white"
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                                onClick={() => onDelete(user)}
                                                disabled={!canDelete(user)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
