import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

export type ColorType = "blue" | "purple" | "green" | "orange";

export interface Skill {
  name: string;
  level: number;
  icon: keyof typeof FaIcons | keyof typeof SiIcons;
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