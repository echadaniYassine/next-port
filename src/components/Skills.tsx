"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SectionDecorator } from "./SectionDecorator";
import { type Language } from "../lib/i18n-config"

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Import separated data and utilities
import {
  colorMappings,
  skillsConfig,
  skillsData
} from "../data/skills/index";

interface SkillsProps {
  locale: Language;
}

const Skills: React.FC<SkillsProps> = ({ locale }: SkillsProps) => {
  const { t } = useTranslation();
  const { skillCategories, summaryStats } = useMemo(() => skillsData, []);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const currentCategory = useMemo(() => skillCategories[activeCategory], [activeCategory, skillCategories]);

  // Helper functions to get translated text
  const getTranslatedSkillLevel = useCallback((level: number): string => {
    if (level >= 90) return t("skills.levels.expert", "Expert");
    if (level >= 80) return t("skills.levels.advanced", "Advanced");
    if (level >= 70) return t("skills.levels.intermediate", "Intermediate");
    return t("skills.levels.basic", "Basic");
  }, [t]);

  const getTranslatedSkillStatus = useCallback((level: number): string => {
    if (level >= 90) return t("skills.status.productionReady", "Production Ready");
    if (level >= 80) return t("skills.status.proficient", "Proficient");
    return t("skills.status.learning", "Learning");
  }, [t]);

  const getTranslatedDescription = useCallback((skillName: string, fallbackDescription: string): string => {
    return t(`skills.descriptions.${skillName}`, fallbackDescription);
  }, [t]);

  const getTranslatedCategoryName = useCallback((categoryName: string): string => {
    return t(`skills.categories.${categoryName}`, categoryName);
  }, [t]);

  const getTranslatedSummaryLabel = useCallback((label: string): string => {
    const labelKey = label.toLowerCase().replace(/\s+/g, '');
    return t(`skills.summary.${labelKey}`, label);
  }, [t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: skillsConfig.intersectionThreshold,
        rootMargin: skillsConfig.intersectionRootMargin
      }
    );

    const currentSkillsRef = skillsRef.current;
    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    return () => {
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, skillsConfig.categoryChangeInterval);

    return () => clearInterval(interval);
  }, [skillCategories.length]);

  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  // Icon component with error handling
  const IconComponent = ({ iconName, className }: { iconName: string; className?: string }) => {
    const FaIcon = FaIcons[iconName as keyof typeof FaIcons];
    const SiIcon = SiIcons[iconName as keyof typeof SiIcons];
    const Icon = FaIcon || SiIcon;

    return Icon ? <Icon className={className} /> : <div className={className}>?</div>;
  };

  return (
    <section id="skills" ref={skillsRef} className="relative py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {t('skills.title')}
              </h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p
            className="mt-6 text-lg max-w-2xl mx-auto"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            {t('skills.subtitle', 'Technologies and tools I use to bring ideas to life')}
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.category}
              onClick={() => handleCategoryChange(index)}
              className={`
        px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border text-xs sm:text-base whitespace-nowrap min-w-[4.5rem] sm:min-w-auto
        ${activeCategory === index
                  ? "shadow-lg ring-2"
                  : "hover:bg-accent/50"
                }
      `}
              style={{
                backgroundColor: activeCategory === index
                  ? `rgb(${colorMappings[category.color].primary} / 0.1)`
                  : 'hsl(var(--card))',
                color: activeCategory === index
                  ? `rgb(${colorMappings[category.color].primary})`
                  : 'hsl(var(--muted-foreground))',
                borderColor: activeCategory === index
                  ? `rgb(${colorMappings[category.color].primary})`
                  : 'hsl(var(--border))',
                ringColor: activeCategory === index
                  ? `rgb(${colorMappings[category.color].primary} / 0.3)`
                  : 'transparent'
              }}
              aria-pressed={activeCategory === index}
              aria-label={`View ${getTranslatedCategoryName(category.category)} skills`}
            >
              {/* Mobile: Show emoji, short name, and count */}
              <div className="sm:hidden flex flex-col items-center gap-0.5">
                <span role="img" aria-label={category.category}>
                  {category.icon}
                </span>
                <span className="text-xs font-medium">
                  {category.shortCategory || category.category}
                </span>
                <span className="text-xs opacity-75">
                  ({category.items.length})
                </span>
              </div>

              {/* Desktop: Show full content */}
              <div className="hidden sm:flex sm:items-center">
                <span className="mr-2" role="img" aria-label={category.category}>
                  {category.icon}
                </span>
                {getTranslatedCategoryName(category.category)}
                <span className="ml-2 text-xs opacity-75">
                  ({category.items.length})
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentCategory.items.map((skill, index) => (
            <div
              key={skill.name}
              className={`
                group p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border relative overflow-hidden
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{
                transitionDelay: `${index * skillsConfig.animationDelayMultiplier}ms`,
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))'
              }}
              onMouseEnter={() => handleSkillHover(skill.name)}
              onMouseLeave={() => handleSkillHover(null)}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `rgb(${colorMappings[currentCategory.color].primary} / 0.1)`,
                      color: `rgb(${colorMappings[currentCategory.color].primary})`
                    }}
                  >
                    <IconComponent iconName={skill.icon} className="text-xl" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold group-hover:text-primary transition-colors duration-300"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {skill.name}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {getTranslatedSkillLevel(skill.level)}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: `rgb(${colorMappings[currentCategory.color].primary})` }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div
                  className="w-full rounded-full h-3 overflow-hidden"
                  style={{ backgroundColor: 'hsl(var(--muted))' }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * skillsConfig.animationDelayMultiplier + 300}ms`,
                      backgroundColor: `rgb(${colorMappings[currentCategory.color].primary})`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Skill Description */}
              <div className="space-y-2">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  {getTranslatedDescription(skill.name, skill.description)}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${hoveredSkill === skill.name ? "animate-pulse" : ""}`}
                      style={{ backgroundColor: `rgb(${colorMappings[currentCategory.color].primary})` }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {getTranslatedSkillStatus(skill.level)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: `rgb(${colorMappings[currentCategory.color].primary})` }}
              />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {summaryStats.map((stat, index) => (
            <SectionDecorator key={stat.label} variant="card">
              <div
                className={`
                  text-center p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:shadow-xl hover:scale-105
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{
                  transitionDelay: `${index * skillsConfig.animationDelayMultiplier + 800}ms`,
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))'
                }}
              >
                <div className="text-4xl mb-3" role="img" aria-label={getTranslatedSummaryLabel(stat.label)}>
                  {stat.icon}
                </div>
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: `rgb(${colorMappings[stat.color].primary})` }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  {getTranslatedSummaryLabel(stat.label)}
                </div>

                {/* Decorative element */}
                <div
                  className={`w-12 h-1 mx-auto mt-3 rounded-full shadow-lg ${isVisible ? "animate-pulse" : ""}`}
                  style={{ backgroundColor: `rgb(${colorMappings[stat.color].primary})` }}
                />
              </div>
            </SectionDecorator>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <SectionDecorator variant="hero">
            <div
              className="rounded-2xl p-8 border"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(221.2 83.2% 53.3% / 0.05))',
                borderColor: 'hsl(var(--primary) / 0.2)'
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {t('skills.cta.title', 'Ready to work together?')}
              </h3>
              <p
                className="mb-6 max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {t('skills.cta.description', "I'm always excited to take on new challenges and learn new technologies. Let's build something amazing!")}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
              >
                {t('skills.cta.buttonText', "Let's Connect")}
              </button>
            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  );
};

export default Skills;