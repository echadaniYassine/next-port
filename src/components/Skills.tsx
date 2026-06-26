"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from '../lib/i18n/client'
import { SectionDecorator } from "./SectionDecorator";
import AnimatedProgress from "./AnimatedProgress";

import {
  colorMappings,
  skillsConfig,
  skillsData
} from "../data/skills/index";

interface SkillsProps {
  locale: any;
}

export default function Skills({ locale }: SkillsProps) {
  const { t } = useTranslation(locale, 'common')
  const { skillCategories, summaryStats } = useMemo(() => skillsData, []);

  // Safe baseline: default to true on smaller viewports so cards never stay hidden
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const currentCategory = useMemo(() => {
    return skillCategories[activeCategory] || skillCategories[0];
  }, [activeCategory, skillCategories]);

  const getTranslatedSkillLevel = useCallback((level: number): string => {
    if (level >= 90) return t("skills.levels.expert" as any, "Expert");
    if (level >= 80) return t("skills.levels.advanced" as any, "Advanced");
    if (level >= 70) return t("skills.levels.intermediate" as any, "Intermediate");
    return t("skills.levels.basic" as any, "Basic");
  }, [t]);

  const getTranslatedSkillStatus = useCallback((level: number): string => {
    if (level >= 90) return t("skills.status.productionReady" as any, "Production Ready");
    if (level >= 80) return t("skills.status.proficient" as any, "Proficient");
    return t("skills.status.learning" as any, "Learning");
  }, [t]);

  const getTranslatedDescription = useCallback((skillName: string, fallbackDescription: string): string => {
    return t(`skills.descriptions.${skillName}` as any, fallbackDescription);
  }, [t]);

  const getTranslatedCategoryName = useCallback((categoryName: string): string => {
    return t(`skills.categories.${categoryName}` as any, categoryName);
  }, [t]);

  const getTranslatedSummaryLabel = useCallback((label: string): string => {
    const labelKey = label.toLowerCase().replace(/\s+/g, '');
    return t(`skills.summary.${labelKey}` as any, label);
  }, [t]);

  // Robust Mobile-First Intersection Setup
  useEffect(() => {
    // If it's a small screen, force visibility immediately to prevent state locks
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsVisible(true);
      return;
    }

    const target = skillsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        // Lower default thresholds specifically for fluid scroll catching
        threshold: Math.min(skillsConfig.intersectionThreshold || 0.1, 0.1),
        rootMargin: "0px 0px -50px 0px"
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !skillCategories.length) return;

    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, skillsConfig.categoryChangeInterval || 8000);

    return () => clearInterval(interval);
  }, [isVisible, skillCategories.length]);

  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="relative py-20 bg-transparent w-full block clear-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('skills.title' as any, 'Skills')}
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-muted-foreground">
            {t('skills.subtitle' as any, 'Technologies and tools I use to bring ideas to life')}
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 w-full">
          {skillCategories.map((category, index) => {
            const isActive = activeCategory === index;
            const themeColors = colorMappings[category.color] || colorMappings.purple;

            return (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(index)}
                className={`
                  cursor-pointer px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border text-xs sm:text-base whitespace-nowrap
                  ${isActive
                    ? "shadow-md ring-2 border-transparent"
                    : "bg-card text-muted-foreground border-border hover:bg-accent/50 hover:text-foreground"
                  }
                `}
                style={isActive ? {
                  backgroundColor: `rgb(${themeColors.primary} / 0.1)`,
                  color: `rgb(${themeColors.primary})`,
                  borderColor: `rgb(${themeColors.primary})`,
                  ['--tw-ring-color' as any]: `rgb(${themeColors.primary} / 0.3)`
                } : undefined}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-lg">{category.icon}</span>
                  <span>{getTranslatedCategoryName(category.category)}</span>
                  <span className="text-xs opacity-60">({category.items.length})</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skills Grid Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 w-full min-h-[100px]">
          {currentCategory?.items.map((skill, index) => {
            const currentTheme = colorMappings[currentCategory.color] || colorMappings.purple;
            const isSkillHovered = hoveredSkill === skill.name;

            return (
              <div
                key={`${activeCategory}-${skill.name}`}
                className={`
                  group p-6 rounded-2xl border bg-card border-border shadow-sm w-full block transition-all duration-300
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-100 md:opacity-0 md:translate-y-10"}
                `}
                onMouseEnter={() => handleSkillHover(skill.name)}
                onMouseLeave={() => handleSkillHover(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{
                        backgroundColor: `rgb(${currentTheme.primary} / 0.1)`,
                        color: `rgb(${currentTheme.primary})`
                      }}
                    >
                      {typeof skill.icon === 'string' ? skill.icon : <skill.icon className="text-lg" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {getTranslatedSkillLevel(skill.level)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: `rgb(${currentTheme.primary})` }}>
                    {skill.level}%
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <AnimatedProgress
                    value={skill.level}
                    colorRGB={currentTheme.primary}
                    delay={0}
                    trigger={activeCategory.toString()}
                  />
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground min-h-[38px] leading-relaxed">
                  {getTranslatedDescription(skill.name, skill.description)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Aggregate Category Summary Metrics Area */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {summaryStats.map((stat) => {
            const statColor = colorMappings[stat.color] || colorMappings.purple;

            return (
              <SectionDecorator key={stat.label} variant="card">
                <div className="text-center p-4 sm:p-6 rounded-2xl border bg-card border-border w-full shadow-sm">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black mb-1" style={{ color: `rgb(${statColor.primary})` }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground truncate">
                    {getTranslatedSummaryLabel(stat.label)}
                  </div>
                </div>
              </SectionDecorator>
            );
          })}
        </div>

      </div>
    </section>
  );
}