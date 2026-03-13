import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Search, 
    LayoutDashboard, 
    Store, 
    Users, 
    Settings, 
    Plus,
    ArrowRight,
    Command
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn"

interface CommandItem {
    id: string
    title: string
    icon: React.ElementType
    shortcut?: string
    action: () => void
    category: "navigation" | "actions"
}

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const commands: CommandItem[] = [
        {
            id: "dashboard",
            title: "Dashboard",
            icon: LayoutDashboard,
            action: () => {
                navigate("/")
                setIsOpen(false)
            },
            category: "navigation",
        },
        {
            id: "outlets",
            title: "Outlets",
            icon: Store,
            action: () => {
                navigate("/outlets")
                setIsOpen(false)
            },
            category: "navigation",
        },
        {
            id: "users",
            title: "Users",
            icon: Users,
            action: () => {
                navigate("/users")
                setIsOpen(false)
            },
            category: "navigation",
        },
        {
            id: "settings",
            title: "Settings",
            icon: Settings,
            action: () => {
                navigate("/settings")
                setIsOpen(false)
            },
            category: "navigation",
        },
        {
            id: "create-outlet",
            title: "Create New Outlet",
            icon: Plus,
            action: () => {
                navigate("/outlets?action=new")
                setIsOpen(false)
            },
            category: "actions",
        },
        {
            id: "create-user",
            title: "Create New User",
            icon: Plus,
            action: () => {
                navigate("/users?action=new")
                setIsOpen(false)
            },
            category: "actions",
        },
    ]

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.title.toLowerCase().includes(search.toLowerCase()) ||
            cmd.category.toLowerCase().includes(search.toLowerCase())
    )

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault()
            setIsOpen((open) => !open)
        }
        if (e.key === "Escape") {
            setIsOpen(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
                    >
                        <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 border-b px-4 py-3">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    autoFocus
                                />
                                <kbd className="hidden h-6 items-center gap-1 rounded-md border bg-muted px-2 text-xs font-medium text-muted-foreground sm:flex">
                                    <span className="text-xs">ESC</span>
                                </kbd>
                            </div>

                            {/* Commands List */}
                            <div className="max-h-[300px] overflow-y-auto p-2">
                                {filteredCommands.length === 0 ? (
                                    <div className="py-8 text-center text-sm text-muted-foreground">
                                        No results found.
                                    </div>
                                ) : (
                                    <>
                                        {/* Navigation Section */}
                                        {filteredCommands.some((c) => c.category === "navigation") && (
                                            <div className="mb-2">
                                                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                                    Navigation
                                                </p>
                                                {filteredCommands
                                                    .filter((c) => c.category === "navigation")
                                                    .map((cmd) => (
                                                        <button
                                                            key={cmd.id}
                                                            onClick={cmd.action}
                                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                                                        >
                                                            <cmd.icon className="h-4 w-4 text-muted-foreground" />
                                                            <span className="flex-1">{cmd.title}</span>
                                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                                                        </button>
                                                    ))}
                                            </div>
                                        )}

                                        {/* Actions Section */}
                                        {filteredCommands.some((c) => c.category === "actions") && (
                                            <div>
                                                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                                    Actions
                                                </p>
                                                {filteredCommands
                                                    .filter((c) => c.category === "actions")
                                                    .map((cmd) => (
                                                        <button
                                                            key={cmd.id}
                                                            onClick={cmd.action}
                                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                                                        >
                                                            <cmd.icon className="h-4 w-4 text-muted-foreground" />
                                                            <span className="flex-1">{cmd.title}</span>
                                                        </button>
                                                    ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">Ctrl</kbd>
                                        <span>+</span>
                                        <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">K</kbd>
                                    </div>
                                    <span>to toggle</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">Enter</kbd>
                                    <span>to select</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// Command Badge for Header
export function CommandBadge() {
    return (
        <button
            onClick={() => {
                const event = new KeyboardEvent("keydown", {
                    key: "k",
                    ctrlKey: true,
                    metaKey: true,
                })
                document.dispatchEvent(event)
            }}
            className="hidden md:flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd>
        </button>
    )
}