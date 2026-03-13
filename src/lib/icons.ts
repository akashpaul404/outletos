import { 
  Home,
  Store,
  Users,
  Settings,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Calendar,
  Ghost,
  FileText,
  Menu
} from 'lucide-react'

export const ICONS = {
  // Navigation
  dashboard: Home,
  outlets: Store,
  users: Users,
  settings: Settings,
  
  // Actions
  add: PlusCircle,
  edit: Pencil,
  delete: Trash2,
  search: Search,
  filter: Filter,
  menu: MoreHorizontal,
  
  // Status
  check: CheckCircle,
  close: XCircle,
  warning: AlertTriangle,
  info: Info,
  
  // UI
  arrowDown: ChevronDown,
  arrowLeft: ChevronLeft,
  arrowRight: ChevronRight,
  
  // Dashboard
  revenue: DollarSign,
  chart: TrendingUp,
  calendar: Calendar,
  
  // Empty States
  empty: Ghost,
  noData: FileText,
}
