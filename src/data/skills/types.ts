import React from 'react';

export type ColorType = "blue" | "purple" | "green" | "orange" | "indigo";

export interface Skill {
  name: string;
  level: number;
  icon: string | React.ComponentType<{ className?: string }>; // OPTIMIZED: Supports raw component references
  description: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: ColorType;
  items: Skill[];
  shortCategory?: string; 
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
  indigo: ColorMapping;
}