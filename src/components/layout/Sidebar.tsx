import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { motion, AnimatePresence } from "framer-motion"
import { Icon3D } from "@/components/ui/icon-3d"
import { ICONS } from "@/lib/icons"

type Role = "admin" | "manager" | "staff"

const navItems: Array<{
    to: string
    label: string
    icon: typeof ICONS.dashboard
    color: string
    gradient: string
    roles: Role[]
}> = [
        { to: "/", label: "Dashboard", icon: ICONS.dashboard, color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", roles: ["admin", "manager", "staff"] },
        { to: "/outlets", label: "Outlets", icon: ICONS.outlets, color: "#a855f7", gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", roles: ["admin", "manager", "staff"] },
        { to: "/users", label: "Users", icon: ICONS.users, color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", roles: ["admin"] },
        { to: "/settings", label: "Settings", icon: ICONS.settings, color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", roles: ["admin", "manager"] },
    ]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24
        }
    }
}

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const user = useAuthStore((state) => state.user)

    const filteredNavItems = navItems.filter(
        (item) => user && item.roles.includes(user.role)
    )

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col glass-sidebar"
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200/50 dark:border-white/5 px-4">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-xl font-bold text-slate-900 dark:text-white"
                        >
                            OutletOS
                        </motion.span>
                    )}
                </AnimatePresence>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    {collapsed ? (
                        <Icon3D icon={ICONS.arrowRight} size={18} hoverRotate={false} />
                    ) : (
                        <Icon3D icon={ICONS.arrowLeft} size={18} hoverRotate={false} />
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <motion.nav
                className="flex-1 space-y-1 p-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredNavItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary dark:bg-primary/10 text-white dark:text-primary"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
                                collapsed && "justify-center px-2"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3"
                            >
                                <Icon3D
                                    icon={item.icon}
                                    size={22}
                                    color={isActive ? item.color : "#71717a"}
                                />
                                <AnimatePresence mode="wait">
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </motion.nav>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-white/5 p-4">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-slate-500 dark:text-slate-400"
                        >
                            © 2026 OutletOS
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    )
}
