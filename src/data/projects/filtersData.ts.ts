import { Filter } from './types'

export const FILTERS: readonly Filter[] = [
  { key: "all" as const, label: "🎯 All Projects" },
  { key: "fullstack" as const, label: "🧩 Full-Stack Applications" },
  { key: "landingPage" as const, label: "🎨 Landing Pages" },
  { key: "wordpress" as const, label: "📝 WordPress Sites" },
  { key: "mobile" as const, label: "📱 Mobile Applications" },
] as const