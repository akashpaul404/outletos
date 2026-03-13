import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Shield, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const securitySchema = z.object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type SecurityFormData = z.infer<typeof securitySchema>

interface Session {
    id: string
    device: string
    location: string
    lastActive: string
    current: boolean
}

const mockSessions: Session[] = [
    {
        id: "1",
        device: "Chrome on Windows",
        location: "New York, US",
        lastActive: "Now",
        current: true,
    },
    {
        id: "2",
        device: "Safari on iPhone",
        location: "New York, US",
        lastActive: "2 hours ago",
        current: false,
    },
    {
        id: "3",
        device: "Firefox on MacOS",
        location: "Los Angeles, US",
        lastActive: "3 days ago",
        current: false,
    },
]

export default function SecurityForm() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<SecurityFormData>({
        resolver: zodResolver(securitySchema),
    })

    const onSubmit = async (data: SecurityFormData) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Password changed:", data)
        setIsLoading(false)
        reset()
    }

    const getPasswordStrength = (password: string): { strength: string; color: string } => {
        if (!password) return { strength: "", color: "" }
        if (password.length < 6) return { strength: "Weak", color: "bg-red-500" }
        if (password.length < 10) return { strength: "Medium", color: "bg-amber-500" }
        return { strength: "Strong", color: "bg-emerald-500" }
    }

    const [newPassword, setNewPassword] = React.useState("")
    const passwordStrength = getPasswordStrength(newPassword)

    return (
        <div className="space-y-6">
            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("currentPassword")}
                                disabled={isLoading}
                            />
                            {errors.currentPassword && (
                                <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("newPassword")}
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }}
                                disabled={isLoading}
                            />
                            {errors.newPassword && (
                                <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                            )}
                            {newPassword && (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${passwordStrength.color}`}
                                            style={{ width: passwordStrength.strength === "Weak" ? "33%" : passwordStrength.strength === "Medium" ? "66%" : "100%" }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{passwordStrength.strength}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading || !isDirty}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <Shield className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">Authenticator App</p>
                                <p className="text-sm text-muted-foreground">
                                    Use an authenticator app to generate verification codes
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={twoFactorEnabled}
                            onCheckedChange={setTwoFactorEnabled}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active sessions across devices</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockSessions.map((session) => (
                            <div
                                key={session.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                        {session.device.includes("iPhone") ? (
                                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                                        ) : (
                                            <Monitor className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{session.device}</p>
                                            {session.current && (
                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {session.location} • {session.lastActive}
                                        </p>
                                    </div>
                                </div>
                                {!session.current && (
                                    <Button variant="outline" size="sm">
                                        Revoke
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
