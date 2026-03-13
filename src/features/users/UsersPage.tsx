import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon3D, Icon3DFloat } from '@/components/ui/icon-3d'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ICONS } from '@/lib/icons'

interface User {
  id: string
  name: string
  email: string
  initials: string
  role: string
  roleBadge: string
  active: boolean
  created: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@outletos.com',
    initials: 'AU',
    role: 'Admin',
    roleBadge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    active: true,
    created: '2026-01-01'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@outletos.com',
    initials: 'SJ',
    role: 'Manager',
    roleBadge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    active: true,
    created: '2026-01-15'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@outletos.com',
    initials: 'MC',
    role: 'Staff',
    roleBadge: 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400',
    active: true,
    created: '2026-02-01'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@outletos.com',
    initials: 'ED',
    role: 'Manager',
    roleBadge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    active: true,
    created: '2026-02-10'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james@outletos.com',
    initials: 'JW',
    role: 'Staff',
    roleBadge: 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400',
    active: false,
    created: '2026-02-20'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 }
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedRow, setSelectedRow] = useState<string | null>(null)

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, active: !user.active } : user
    ))
    toast.success('User status updated')
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div className="flex items-center gap-4">
          <Icon3DFloat
            icon={ICONS.users}
            size={48}
            color="#f59e0b"
          />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Users</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage team members and permissions
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient rounded-xl font-bold text-white"
          onClick={() => toast.success('Add user modal would open here')}
        >
          <Icon3D icon={ICONS.add} size={20} hoverRotate={false} />
          Add User
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon3D icon={ICONS.search} size={20} color="#71717a" hoverRotate={false} />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="appearance-none px-4 py-2.5 pr-10 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon3D icon={ICONS.arrowDown} size={16} hoverRotate={false} />
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-slate-400">User</th>
              <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-slate-400">Role</th>
              <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-slate-400">Status</th>
              <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-slate-400">Created</th>
              <th className="text-right p-4 font-bold text-xs uppercase tracking-wider text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  layout
                  onClick={() => setSelectedRow(user.id)}
                  className={cn(
                    "border-b border-slate-100 dark:border-white/5 cursor-pointer transition-colors hover:bg-white/40 dark:hover:bg-white/5",
                    selectedRow === user.id && "bg-primary/10"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-semibold text-primary"
                      >
                        {user.initials}
                      </motion.div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
                      user.roleBadge
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={user.active}
                      onCheckedChange={() => handleToggleStatus(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{user.created}</span>
                  </td>
                  <td className="p-4 text-right">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info(`Actions for ${user.name}`)
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                    >
                      <Icon3D icon={ICONS.menu} size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* Empty State */}
      {
        filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <Icon3DFloat icon={ICONS.empty} size={64} color="#a1a1aa" />
            <h3 className="mt-4 text-lg font-semibold text-white">No users found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters</p>
          </motion.div>
        )
      }
    </div >
  )
}
