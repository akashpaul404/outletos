import React from "react"
import { Sun, Moon, Monitor, Check } from "lucide-react"
import { cn } from "@/utils/cn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Theme = "light" | "dark" | "system"
type AccentColor = "indigo" | "emerald" | "rose"

interface AppearanceSettingsProps {
    onThemeChange?: (theme: Theme) => void
}

const accentColors: { id: AccentColor; name: string; color: string }[] = [
    { id: "indigo", name: "Indigo", color: "bg-indigo-500" },
    { id: "emerald", name: "Emerald", color: "bg-emerald-500" },
    { id: "rose", name: "Rose", color: "bg-rose-500" },
]

export default function AppearanceSettings({ onThemeChange }: AppearanceSettingsProps) {
    const [theme, setTheme] = React.useState<Theme>(() => {
        // Sync with actual DOM state
        const isDarkInDOM = document.documentElement.classList.contains('dark')
        return isDarkInDOM ? 'dark' : 'light'
    })
    const [accentColor, setAccentColor] = React.useState<AccentColor>("indigo")

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        onThemeChange?.(newTheme)

        // Apply theme to document
        const root = document.documentElement
        if (newTheme === "dark") {
            root.classList.add("dark")
            localStorage.setItem('theme', 'dark')
        } else if (newTheme === "light") {
            root.classList.remove("dark")
            localStorage.setItem('theme', 'light')
        } else {
            // System preference
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (isDark) {
                root.classList.add("dark")
                localStorage.setItem('theme', 'dark')
            } else {
                root.classList.remove("dark")
                localStorage.setItem('theme', 'light')
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how OutletOS looks for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            type="button"
                            onClick={() => handleThemeChange("light")}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors hover:bg-muted/50",
                                theme === "light" ? "border-primary bg-muted/50" : "border-transparent"
                            )}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <Sun className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium">Light</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleThemeChange("dark")}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors hover:bg-muted/50",
                                theme === "dark" ? "border-primary bg-muted/50" : "border-transparent"
                            )}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <Moon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium">Dark</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleThemeChange("system")}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors hover:bg-muted/50",
                                theme === "system" ? "border-primary bg-muted/50" : "border-transparent"
                            )}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <Monitor className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium">System</span>
                        </button>
                    </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">Accent Color</label>
                    <div className="flex gap-3">
                        {accentColors.map((color) => (
                            <button
                                key={color.id}
                                type="button"
                                onClick={() => setAccentColor(color.id)}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110",
                                    color.color
                                )}
                            >
                                {accentColor === color.id && (
                                    <Check className="h-5 w-5 text-white" />
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Selected: {accentColors.find((c) => c.id === accentColor)?.name}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
