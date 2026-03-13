import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Outlet, OutletStatus } from "@/types/outlet"

interface OutletTableProps {
    outlets: Outlet[]
    onEdit: (outlet: Outlet) => void
    onDelete: (outlet: Outlet) => void
}

const statusStyles: Record<OutletStatus, string> = {
    active: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full px-2.5 py-0.5 text-xs font-bold",
    pending: "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded-full px-2.5 py-0.5 text-xs font-bold",
    inactive: "bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20 rounded-full px-2.5 py-0.5 text-xs font-bold",
}

function formatRevenue(revenue: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(revenue)
}

export default function OutletTable({ outlets, onEdit, onDelete }: OutletTableProps) {
    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-left">
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                                Name
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Location
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Status
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                                Revenue
                            </th>
                            <th className="sticky top-0 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {outlets.map((outlet, index) => (
                            <motion.tr
                                key={outlet.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="border-b border-slate-100 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 dark:text-white">{outlet.name}</div>
                                    <div className="text-xs text-slate-500">
                                        Created {outlet.createdAt}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                    {outlet.location}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center border text-xs font-bold capitalize ${statusStyles[outlet.status]}`}
                                    >
                                        {outlet.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                                    {formatRevenue(outlet.revenue)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 p-2 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass-card border-slate-200 dark:border-white/10">
                                            <DropdownMenuItem onClick={() => onEdit(outlet)} className="text-slate-600 dark:text-slate-300 focus:bg-slate-100/80 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white">
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                                onClick={() => onDelete(outlet)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
