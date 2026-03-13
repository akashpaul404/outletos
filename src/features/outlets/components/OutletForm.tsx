import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import type { Outlet, OutletFormData } from "@/types/outlet"

const outletSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    revenue: z.number().min(0, "Revenue must be positive"),
    status: z.enum(["active", "inactive", "pending"]),
})

type FormSchema = z.infer<typeof outletSchema>

interface OutletFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    outlet?: Outlet | null
    onSubmit: (data: OutletFormData) => Promise<void>
    isLoading?: boolean
}

export default function OutletForm({
    open,
    onOpenChange,
    outlet,
    onSubmit,
    isLoading = false,
}: OutletFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(outletSchema),
        defaultValues: {
            name: outlet?.name || "",
            location: outlet?.location || "",
            revenue: outlet?.revenue || 0,
            status: outlet?.status || "active",
        },
    })

    // Reset form when outlet changes
    React.useEffect(() => {
        if (open) {
            reset({
                name: outlet?.name || "",
                location: outlet?.location || "",
                revenue: outlet?.revenue || 0,
                status: outlet?.status || "active",
            })
        }
    }, [open, outlet, reset])

    const handleFormSubmit = async (data: FormSchema) => {
        await onSubmit(data as OutletFormData)
        reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] glass-card border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-slate-900 dark:text-white">
                        {outlet ? "Edit Outlet" : "Create New Outlet"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter outlet name"
                            {...register("name")}
                            disabled={isLoading}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-primary/50"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-slate-700 dark:text-slate-300">Location</Label>
                        <Input
                            id="location"
                            placeholder="Enter location"
                            {...register("location")}
                            disabled={isLoading}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-primary/50"
                        />
                        {errors.location && (
                            <p className="text-sm text-red-400">{errors.location.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="revenue" className="text-slate-700 dark:text-slate-300">Revenue ($)</Label>
                        <Input
                            id="revenue"
                            type="number"
                            placeholder="0"
                            {...register("revenue", { valueAsNumber: true })}
                            disabled={isLoading}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-primary/50"
                        />
                        {errors.revenue && (
                            <p className="text-sm text-red-400">{errors.revenue.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-slate-700 dark:text-slate-300">Status</Label>
                        <Select
                            id="status"
                            {...register("status")}
                            disabled={isLoading}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                        >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                        </Select>
                        {errors.status && (
                            <p className="text-sm text-red-400">{errors.status.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                            className="border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="btn-gradient">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {outlet ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                outlet ? "Update" : "Create"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
