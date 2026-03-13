import { cn } from "@/utils/cn"
import type { UserRole } from "@/types/user"

interface RoleBadgeProps {
    role: UserRole
}

const roleStyles: Record<UserRole, string> = {
    admin: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    manager: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    staff: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
}

export default function RoleBadge({ role }: RoleBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                roleStyles[role]
            )}
        >
            {role}
        </span>
    )
}
