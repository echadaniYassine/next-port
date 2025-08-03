import { Filter } from './types'

export const FILTERS: readonly Filter[] = [
  { key: "all" as const, label: "🎯 All Projects", shortLabel: "🎯 All" },
  { key: "fullstack" as const, label: "🧩 Full-Stack Applications", shortLabel: "🧩 Full-Stack" },
  { key: "landingPage" as const, label: "🎨 Landing Pages", shortLabel: "🎨 Landing" },
  { key: "wordpress" as const, label: "📝 WordPress Sites", shortLabel: "📝 WordPress" },
  { key: "mobile" as const, label: "📱 Mobile Applications", shortLabel: "📱 Mobile" },
] as const