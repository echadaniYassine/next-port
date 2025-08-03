import { ProjectStatus } from './types'

export interface StatusConfig {
  label: string
  className: string
  icon: string
}

export const STATUS_CONFIG: Record<ProjectStatus, StatusConfig> = {
  completed: {
    label: "Completed",
    className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    icon: "✅",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    icon: "🚧",
  },
  planning: {
    label: "Planning",
    className: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
    icon: "📋",
  },
}