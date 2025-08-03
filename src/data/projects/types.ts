export type ProjectStatus = "completed" | "in-progress" | "planning"
export type ProjectCategory = "fullstack" | "frontend" | "wordpress" | "mobile" | "landingPage"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  category: ProjectCategory
  tech: readonly string[]
  liveLink: string
  githubLink: string
  featured: boolean
  status: ProjectStatus
  year: string
}

export interface Filter {
  key: "all" | ProjectCategory
  label: string,
  shortLabel: string

}