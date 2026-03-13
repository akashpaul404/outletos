import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    DollarSign,
    Users,
    Store,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts"

// Animated counter component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = 1500
        const steps = 60
        const increment = value / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        return () => clearInterval(timer)
    }, [value])

    return (
        <span>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    )
}

const kpiData = [
    {
        title: "Total Revenue",
        value: 45231,
        prefix: "$",
        change: 12.5,
        trend: "up",
        icon: DollarSign,
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
        title: "Active Users",
        value: 1429,
        change: 8.2,
        trend: "up",
        icon: Users,
        gradient: "from-blue-500 to-indigo-500",
        bgGradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
        title: "Total Outlets",
        value: 24,
        change: 2,
        trend: "up",
        icon: Store,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
        title: "Growth Rate",
        value: 23.5,
        suffix: "%",
        change: -2.1,
        trend: "down",
        icon: TrendingUp,
        gradient: "from-orange-500 to-amber-500",
        bgGradient: "from-orange-500/10 to-amber-500/10",
    },
]

const revenueData = [
    { name: "Jan", revenue: 4000, users: 240 },
    { name: "Feb", revenue: 3000, users: 198 },
    { name: "Mar", revenue: 5000, users: 320 },
    { name: "Apr", revenue: 4500, users: 280 },
    { name: "May", revenue: 6000, users: 400 },
    { name: "Jun", revenue: 5500, users: 380 },
    { name: "Jul", revenue: 7000, users: 450 },
    { name: "Aug", revenue: 6500, users: 420 },
    { name: "Sep", revenue: 8000, users: 520 },
    { name: "Oct", revenue: 7500, users: 480 },
    { name: "Nov", revenue: 9000, users: 580 },
    { name: "Dec", revenue: 8500, users: 550 },
]

const activityData = [
    { id: 1, action: "New outlet created", outlet: "Downtown Cafe", time: "2 min ago", type: "create" },
    { id: 2, action: "User registered", outlet: "John Smith", time: "15 min ago", type: "user" },
    { id: 3, action: "Outlet updated", outlet: "Beach Restaurant", time: "1 hour ago", type: "update" },
    { id: 4, action: "Payment received", outlet: "Mountain Lodge", time: "2 hours ago", type: "payment" },
    { id: 5, action: "New order placed", outlet: "City Bistro", time: "3 hours ago", type: "order" },
]

const recentOutlets = [
    { id: 1, name: "Downtown Cafe", location: "New York", status: "Active", revenue: "$12,400" },
    { id: 2, name: "Beach Restaurant", location: "Miami", status: "Active", revenue: "$8,200" },
    { id: 3, name: "Mountain Lodge", location: "Denver", status: "Pending", revenue: "$5,600" },
    { id: 4, name: "City Bistro", location: "Chicago", status: "Active", revenue: "$15,300" },
    { id: 5, name: "Harbor View", location: "Seattle", status: "Inactive", revenue: "$0" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border bg-card p-3 shadow-lg">
                <p className="text-sm font-medium mb-2">{label}</p>
                {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground">{item.name}:</span>
                        <span className="font-medium">
                            {item.name === "Revenue" ? `$${item.value.toLocaleString()}` : item.value}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

export default function Dashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">{currentDate}</p>
            </motion.div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi) => (
                    <motion.div
                        key={kpi.title}
                        variants={itemVariants}
                        className="glass-card rounded-xl p-5 flex flex-col gap-4 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors"
                    >
                        {/* Icon Container */}
                        <div
                            className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${kpi.bgGradient}`}
                        >
                            <kpi.icon className={`h-5 w-5`} style={{ color: kpi.gradient.includes('emerald') ? '#10b981' : kpi.gradient.includes('blue') ? '#3b82f6' : kpi.gradient.includes('purple') ? '#a855f7' : '#f97316' }} />
                        </div>

                        {/* Title */}
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{kpi.title}</p>

                        {/* Value */}
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                        </p>

                        {/* Trend */}
                        <div className="flex items-center gap-1 text-xs">
                            {kpi.trend === "up" ? (
                                <>
                                    <span className="text-emerald-400 font-medium">+{kpi.change}%</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-red-400 font-medium">{kpi.change}%</span>
                                </>
                            )}
                            <span className="text-slate-400 dark:text-slate-500">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart - Hero Section */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 glass-card rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly revenue and user growth</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Users</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                    strokeOpacity={0.3}
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fill="url(#revenueGradient)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    name="Users"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="url(#usersGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Activity Panel */}
                <motion.div
                    variants={itemVariants}
                    className="glass-card rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                        <Activity className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {activityData.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 rounded-lg p-2 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors"
                            >
                                <div
                                    className={`mt-0.5 h-2 w-2 rounded-full ${activity.type === "create"
                                        ? "bg-emerald-500"
                                        : activity.type === "user"
                                            ? "bg-blue-500"
                                            : activity.type === "update"
                                                ? "bg-amber-500"
                                                : activity.type === "payment"
                                                    ? "bg-purple-500"
                                                    : "bg-pink-500"
                                        }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{activity.action}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{activity.outlet}</p>
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Outlets Table */}
            <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Outlets</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/10 text-left">
                                <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                                <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Location</th>
                                <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOutlets.map((outlet) => (
                                <tr
                                    key={outlet.id}
                                    className="border-b border-slate-200/80 dark:border-white/5 last:border-0 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">{outlet.name}</td>
                                    <td className="py-4 text-sm text-slate-500 dark:text-slate-400">{outlet.location}</td>
                                    <td className="py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${outlet.status === "Active"
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : outlet.status === "Pending"
                                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                    : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                                                }`}
                                        >
                                            {outlet.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm text-right font-medium text-slate-900 dark:text-white">{outlet.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    )
}