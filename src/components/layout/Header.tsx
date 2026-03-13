import { Moon, Sun, LogOut, User, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { CommandBadge } from "@/components/ui/command-palette"

interface HeaderProps {
    title: string
}

export default function Header({ title }: HeaderProps) {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    )
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    const toggleDarkMode = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)
        
        if (newIsDark) {
            document.documentElement.classList.add("dark")
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem('theme', 'light')
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
            case "manager":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    return (
        <header className="flex h-16 items-center justify-between glass-header px-6">
            {/* Page Title */}
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>

            <div className="flex items-center gap-4">
                {/* Command Palette Badge */}
                <CommandBadge />

                {/* Dark Mode Toggle */}
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5">
                    {isDark ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-slate-100/80 dark:hover:bg-white/5">
                            <Avatar>
                                <AvatarFallback className="bg-primary/20 text-primary">
                                    {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 glass-card border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">{user?.name}</p>
                                <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                                    {user?.email}
                                </p>
                                {user?.role && (
                                    <span className={`mt-1 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                )}
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-200 dark:bg-white/10" />
                        <DropdownMenuItem onClick={() => navigate("/settings")} className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/settings")} className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-200 dark:bg-white/10" />
                        <DropdownMenuItem className="text-red-500 focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-500" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}