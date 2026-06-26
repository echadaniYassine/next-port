"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from '../lib/i18n/client'
import { SectionDecorator } from "./SectionDecorator";
import AnimatedProgress from "./AnimatedProgress";

// Import separated data and utilities
import {
  colorMappings,
  skillsConfig,
  skillsData
} from "../data/skills/index";

interface SkillsProps {
  locale: any; // Dynamic language support bound directly to configuration layout layers
}

export default function Skills({ locale }: SkillsProps) {
  const { t } = useTranslation(locale, 'common')
  const { skillCategories, summaryStats } = useMemo(() => skillsData, []);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const currentCategory = useMemo(() => skillCategories[activeCategory], [activeCategory, skillCategories]);

  // Translate helpers
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

  // Clean visibility intersection tracker
  useEffect(() => {
    const target = skillsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Keep tracking decoupled from looping to protect runtime memory layers
        }
      },
      {
        threshold: skillsConfig.intersectionThreshold,
        rootMargin: skillsConfig.intersectionRootMargin
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // OPTIMIZED: The rotation interval auto-resets when the user manually clicks a tab
  useEffect(() => {
    if (!isVisible) return; // Keep interval frozen if user is not looking at this section

    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, skillsConfig.categoryChangeInterval);

    return () => clearInterval(interval);
  }, [isVisible, skillCategories.length, activeCategory]); // Dependency bound ensures active resets don't cross-fire loops

  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="relative py-20 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('skills.title' as any)}
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-pulse" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-muted-foreground">
            {t('skills.subtitle' as any, 'Technologies and tools I use to bring ideas to life')}
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {skillCategories.map((category, index) => {
            const isActive = activeCategory === index;
            const themeColors = colorMappings[category.color];

            return (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(index)}
                className={`
                  cursor-pointer px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border text-xs sm:text-base whitespace-nowrap min-w-[4.5rem] sm:min-w-auto
                  ${isActive 
                    ? "shadow-lg ring-2 border-transparent" 
                    : "bg-card text-muted-foreground border-border hover:bg-accent/50 hover:text-foreground"
                  }
                `}
                style={isActive ? {
                  backgroundColor: `rgb(${themeColors.primary} / 0.1)`,
                  color: `rgb(${themeColors.primary})`,
                  borderColor: `rgb(${themeColors.primary})`,
                  // Fixed direct custom property casting safety
                  ['--tw-ring-color' as any]: `rgb(${themeColors.primary} / 0.3)`
                } : undefined}
                aria-pressed={isActive}
                aria-label={`View ${getTranslatedCategoryName(category.category)} skills`}
              >
                {/* Mobile View Layout */}
                <div className="sm:hidden flex flex-col items-center gap-0.5">
                  <span role="img" aria-label={category.category} className="text-base">
                    {category.icon}
                  </span>
                  <span className="text-xs font-medium">
                    {category.shortCategory || category.category}
                  </span>
                  <span className="text-[10px] opacity-75">
                    ({category.items.length})
                  </span>
                </div>

                {/* Desktop View Layout */}
                <div className="hidden sm:flex sm:items-center">
                  <span className="mr-2 text-lg" role="img" aria-label={category.category}>
                    {category.icon}
                  </span>
                  {getTranslatedCategoryName(category.category)}
                  <span className="ml-2 text-xs opacity-75">
                    ({category.items.length})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skills Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentCategory.items.map((skill, index) => {
            const currentTheme = colorMappings[currentCategory.color];
            const isSkillHovered = hoveredSkill === skill.name;

            return (
              <div
                key={`${activeCategory}-${skill.name}`} // Re-mount component lifecycle dynamically when changing tabs
                className={`
                  group p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] border relative overflow-hidden bg-card border-border
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{
                  transitionDelay: `${index * skillsConfig.animationDelayMultiplier}ms`,
                }}
                onMouseEnter={() => handleSkillHover(skill.name)}
                onMouseLeave={() => handleSkillHover(null)}
              >
                {/* Skill Header Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:rotate-6"
                      style={{
                        backgroundColor: `rgb(${currentTheme.primary} / 0.1)`,
                        color: `rgb(${currentTheme.primary})`
                      }}
                    >
                      {/* OPTIMIZED: Standard dynamic static component references injection loaded directly from data maps */}
                      {typeof skill.icon === 'string' ? skill.icon : <skill.icon className="text-xl" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {getTranslatedSkillLevel(skill.level)}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: `rgb(${currentTheme.primary})` }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Animation Bar Tracker */}
                <div className="space-y-2 mb-4">
                  <AnimatedProgress
                    value={skill.level}
                    colorRGB={currentTheme.primary}
                    delay={index * skillsConfig.animationDelayMultiplier + 200}
                    trigger={activeCategory}
                  />
                </div>

                {/* Skill Explanations block */}
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-muted-foreground min-h-[40px]">
                    {getTranslatedDescription(skill.name, skill.description)}
                  </p>
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${isSkillHovered ? "animate-ping" : ""}`}
                        style={{ backgroundColor: `rgb(${currentTheme.primary})` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {getTranslatedSkillStatus(skill.level)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Accent Background Layer */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: `rgb(${currentTheme.primary})` }}
                />
              </div>
            );
          })}
        </div>

        {/* Aggregate Category Summary Metrics Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {summaryStats.map((stat, index) => {
            const statColor = colorMappings[stat.color];

            return (
              <SectionDecorator key={stat.label} variant="card">
                <div
                  className={`
                    text-center p-6 rounded-2xl shadow-lg border bg-card border-border transition-all duration-500 hover:shadow-xl hover:scale-105
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
                  style={{
                    transitionDelay: `${index * skillsConfig.animationDelayMultiplier + 400}ms`,
                  }}
                >
                  <div className="text-4xl mb-3" role="img" aria-label={getTranslatedSummaryLabel(stat.label)}>
                    {stat.icon}
                  </div>
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ color: `rgb(${statColor.primary})` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {getTranslatedSummaryLabel(stat.label)}
                  </div>

                  {/* Visual Glow Decorative Divider */}
                  <div
                    className="w-12 h-1 mx-auto mt-3 rounded-full animate-pulse"
                    style={{ backgroundColor: `rgb(${statColor.primary})` }}
                  />
                </div>
              </SectionDecorator>
            );
          })}
        </div>

        {/* Call to Action Layer Block */}
        <div className="text-center mt-16">
          <SectionDecorator variant="hero">
            <div className="rounded-2xl p-8 border bg-gradient-to-br from-purple-500/5 to-red-500/5 border-purple-500/20">
              <h3 className="text-2xl font-black mb-4 text-foreground">
                {t('skills.cta.title' as any, 'Ready to work together?')}
              </h3>
              <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
                {t('skills.cta.description' as any, "I'm always excited to take on new challenges and learn new technologies. Let's build something amazing!")}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 cursor-pointer"
              >
                {t('skills.cta.buttonText' as any, "Let's Connect")}
              </button>
            </div>
          </SectionDecorator>
        </div>

      </div>
    </section>
  );
}