/**
 * Centralized Icon Registry
 *
 * Import and register all Lucide icons used in the application here.
 * This approach provides:
 * - Tree-shaking: Only imported icons are bundled
 * - Centralized management: Add/remove icons in one place
 * - Type safety: JSDoc provides autocomplete for icon names
 * - Easy refactoring: Change icon names or libraries without touching components
 */

import {
  // Navigation & Layout
  LayoutPanelTop,
  ClockFading,
  BadgeCheck,
  BadgeX,
  ListCheck,
  List,
  SquareUser,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,

  // Actions
  Plus,
  PlusCircle,
  Search,
  SearchX,
  Filter,
  Edit,
  FileEdit,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Send,

  // Status & Feedback
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Ban,

  // Common
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Timer,
  Hourglass,
  User,
  UserCircle,
  Users,
  Building,
  Briefcase,
  Mail,
  Phone,
  Bell,
  BellRing,
  Globe,

  // Content & Communication
  MessageCircle,
  Package,
  ExternalLink,

  // Charts & Data
  BarChart,
  ClipboardList,

  // Celebration & Special
  Sparkles,

  // Security
  ShieldCheck,
  ShieldAlert,
  Lock,

  // Additional Icons
  MoreVertical,
  FileText,
  Store,
  LayoutDashboard,
  CircleX,
  CircleSlash,
  ListChecks,
  Circle,
  CircleDot,
  TextSearch,
  FolderX,

  // File Icons
  File,
  FileImage,
  FileExclamationPoint,
  FileVideo,
  FileAudio,
  FileJson,
  Archive,
  FileSpreadsheet,
  FileXCorner,
  UploadCloud,
  Paperclip,
  PackageOpen,
  PackageSearch,
  PackageX,
} from 'lucide-vue-next'

/**
 * Icon Registry Map
 * Maps string names to Lucide icon components
 *
 * Naming convention: Use kebab-case for icon names
 * @type {Record<string, import('vue').Component>}
 */
export const ICON_REGISTRY = {
  // Navigation & Layout
  'layout-panel-top': LayoutPanelTop,
  'clock-fading': ClockFading,
  'badge-check': BadgeCheck,
  'badge-x': BadgeX,
  'list-check': ListCheck,
  list: List,
  'square-user': SquareUser,
  menu: Menu,
  'x-icon': X,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,

  // Actions
  plus: Plus,
  'plus-circle': PlusCircle,
  search: Search,
  'search-x': SearchX,
  filter: Filter,
  edit: Edit,
  'file-edit': FileEdit,
  'file-x-corner': FileXCorner,
  trash: Trash2,
  save: Save,
  download: Download,
  upload: Upload,
  copy: Copy,
  check: Check,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  send: Send,

  // Status & Feedback
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  info: Info,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'help-circle': HelpCircle,
  ban: Ban,
  bell: Bell,

  // Common
  settings: Settings,
  logout: LogOut,
  eye: Eye,
  'eye-off': EyeOff,
  calendar: Calendar,
  clock: Clock,
  timer: Timer,
  hourglass: Hourglass,
  user: User,
  'user-circle': UserCircle,
  users: Users,
  building: Building,
  briefcase: Briefcase,
  mail: Mail,
  phone: Phone,
  'bell-ring': BellRing,
  globe: Globe,

  // Content & Communication
  'message-circle': MessageCircle,
  package: Package,
  'package-x': PackageX,
  'package-open': PackageOpen,
  'package-search': PackageSearch,

  'external-link': ExternalLink,

  // Charts & Data
  'bar-chart': BarChart,
  'clipboard-list': ClipboardList,

  // Celebration & Special
  sparkles: Sparkles,

  // Security
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  lock: Lock,

  // Additional Icons
  'more-vertical': MoreVertical,
  'file-text': FileText,
  store: Store,
  'layout-dashboard': LayoutDashboard,
  'circle-x': CircleX,
  'circle-slash': CircleSlash,
  'list-checks': ListChecks,
  circle: Circle,
  'circle-dot': CircleDot,
  'text-search': TextSearch,
  'folder-x': FolderX,

  // File Icons
  file: File,
  'file-image': FileImage,
  'file-video': FileVideo,
  'file-audio': FileAudio,
  'file-exclamation-point': FileExclamationPoint,
  'file-json': FileJson,
  archive: Archive,
  'file-spreadsheet': FileSpreadsheet,
  'upload-cloud': UploadCloud,
  paperclip: Paperclip,
}

/**
 * Get icon component by name
 * @param {string} name - Icon name (kebab-case)
 * @returns {import('vue').Component | null}
 */
export function getIcon(name) {
  return ICON_REGISTRY[name] || null
}
