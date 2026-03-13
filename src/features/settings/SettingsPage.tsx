import { useState } from "react"
import { motion } from "framer-motion"
import { User, Shield, Palette } from "lucide-react"
import { cn } from "@/utils/cn"
import { Toast } from "@/components/ui/toast"
import { useAuthStore } from "@/store/authStore"
import ProfileForm from "./components/ProfileForm"
import SecurityForm from "./components/SecurityForm"
import AppearanceSettings from "./components/AppearanceSettings"

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
    const user = useAuthStore((state) => state.user)

    const handleProfileSave = async (data: { name: string; email: string; company?: string }) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Profile saved:", data)
        setToast({ message: "Profile updated successfully", type: "success" })
    }

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account settings and preferences</p>
            </motion.div>

            {/* Tabs */}
            <motion.div
                className="inline-flex p-1.5 bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-full border border-white/50 dark:border-white/10 shadow-sm"
                variants={itemVariants}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-semibold transition-colors",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                {activeTab === "profile" && (
                    <ProfileForm
                        defaultValues={{
                            name: user?.name || "",
                            email: user?.email || "",
                            company: "OutletOS Inc.",
                        }}
                        onSave={handleProfileSave}
                    />
                )}

                {activeTab === "security" && <SecurityForm />}

                {activeTab === "appearance" && <AppearanceSettings />}
            </motion.div>

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </motion.div>
    )
}
