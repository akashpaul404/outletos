import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { success, error } from "@/lib/toast"
import { useOutletStore } from "@/store/outletStore"
import type { Outlet, OutletFormData, OutletStatus } from "@/types/outlet"
import OutletTable from "./components/OutletTable"
import OutletForm from "./components/OutletForm"
import DeleteDialog from "./components/DeleteDialog"
import { Icon3D, Icon3DFloat } from "@/components/ui/icon-3d"
import { ICONS } from "@/lib/icons"

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

export default function OutletsPage() {
    const { outlets, loading, fetchOutlets, addOutlet, updateOutlet, deleteOutlet } = useOutletStore()

    // State
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<OutletStatus | "all">("all")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch outlets on mount
    useEffect(() => {
        fetchOutlets()
    }, [fetchOutlets])

    // Filter outlets
    const filteredOutlets = useMemo(() => {
        return outlets.filter((outlet) => {
            const matchesSearch =
                outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                outlet.location.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === "all" || outlet.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [outlets, searchQuery, statusFilter])

    // Handlers
    const handleCreate = () => {
        setSelectedOutlet(null)
        setFormOpen(true)
    }

    const handleEdit = (outlet: Outlet) => {
        setSelectedOutlet(outlet)
        setFormOpen(true)
    }

    const handleDelete = (outlet: Outlet) => {
        setSelectedOutlet(outlet)
        setDeleteOpen(true)
    }

    const handleFormSubmit = async (data: OutletFormData) => {
        setIsSubmitting(true)
        try {
            if (selectedOutlet) {
                await updateOutlet(selectedOutlet.id, data)
                success("Outlet updated successfully")
            } else {
                await addOutlet(data)
                success("Outlet created successfully")
            }
        } catch {
            error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!selectedOutlet) return
        setIsSubmitting(true)
        try {
            await deleteOutlet(selectedOutlet.id)
            success("Outlet deleted successfully")
        } catch {
            error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <Icon3DFloat 
                    icon={ICONS.outlets} 
                    size={48}
                    color="#8b5cf6"
                />
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Outlets</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your outlet locations</p>
                </div>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                variants={itemVariants}
            >
                <div className="flex flex-1 gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Icon3D icon={ICONS.search} className="absolute left-3 top-1/2 -translate-y-1/2" size={18} color="#71717a" hoverRotate={false} />
                        <Input
                            placeholder="Search outlets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as OutletStatus | "all")}
                        className="w-[140px] bg-white/5 border-white/10 text-white"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                </div>
                <Button onClick={handleCreate} className="btn-gradient">
                    <Icon3D icon={ICONS.add} size={18} hoverRotate={false} />
                    Add Outlet
                </Button>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants}>
                {loading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : filteredOutlets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center glass-card rounded-xl p-12">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                            <Icon3DFloat icon={ICONS.outlets} size={36} color="#71717a" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-white">No outlets found</h3>
                        <p className="mt-1 text-sm text-slate-400">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search or filter"
                                : "Get started by creating your first outlet"}
                        </p>
                        {!searchQuery && statusFilter === "all" && (
                            <Button className="mt-4 btn-gradient" onClick={handleCreate}>
                                <Icon3D icon={ICONS.add} size={18} hoverRotate={false} />
                                Add Outlet
                            </Button>
                        )}
                    </div>
                ) : (
                    <OutletTable
                        outlets={filteredOutlets}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </motion.div>

            {/* Modals */}
            <OutletForm
                open={formOpen}
                onOpenChange={setFormOpen}
                outlet={selectedOutlet}
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
            />

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDeleteConfirm}
                outletName={selectedOutlet?.name || ""}
                isLoading={isSubmitting}
            />
        </motion.div>
    )
}
