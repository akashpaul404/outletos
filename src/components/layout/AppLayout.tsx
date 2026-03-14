import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { CommandPalette } from "@/components/ui/command-palette"

const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/outlets": "Outlets",
    "/users": "Users",
    "/settings": "Settings",
}

export default function AppLayout() {
    const location = useLocation()
    const title = pageTitles[location.pathname] || "Dashboard"

    return (
        <div className="flex h-screen page-bg">
            {/* Command Palette - Global */}
            <CommandPalette />

            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden page-bg">
                <Header title={title} />
                <main className="flex-1 overflow-auto p-8 page-bg">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}