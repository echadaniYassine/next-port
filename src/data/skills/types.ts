// src/data/skills/types.ts
export type ColorType = "blue" | "purple" | "green" | "orange";

export interface Skill {
  name: string;
  level: number;
  icon: string; // Icon name as string
  description: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: ColorType;
  items: Skill[];
}

export interface SummaryStat {
  label: string;
  value: string;
  icon: string;
  color: ColorType;
}

export interface SkillsData {
  skillCategories: SkillCategory[];
  summaryStats: SummaryStat[];
}

export interface ColorMapping {
  primary: string;
  light: string;
  lighter: string;
}

export interface ColorMappings {
  blue: ColorMapping;
  purple: ColorMapping;
  green: ColorMapping;
  orange: ColorMapping;
}