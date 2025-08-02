"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SectionDecorator } from "./SectionDecorator";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Define types for better type safety and code readability
type ColorType = "blue" | "purple" | "green" | "orange";

interface Skill {
  name: string;
  level: number;
  icon: keyof typeof FaIcons | keyof typeof SiIcons;
  description: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  color: ColorType;
  items: Skill[];
}

interface SummaryStat {
  label: string;
  value: string;
  icon: string;
  color: ColorType;
}

// Skills data - moved inline for better maintainability
const skillsData = {
  skillCategories: [
    {
      category: "Frontend",
      icon: "🎨",
      color: "blue" as ColorType,
      items: [
        { name: "HTML5", level: 95, icon: "FaHtml5" as keyof typeof FaIcons, description: "Semantic markup and accessibility" },
        { name: "CSS3", level: 90, icon: "FaCss3Alt" as keyof typeof FaIcons, description: "Modern styling and animations" },
        { name: "JavaScript", level: 92, icon: "FaJs" as keyof typeof FaIcons, description: "ES6+ and modern features" },
        { name: "React", level: 88, icon: "FaReact" as keyof typeof FaIcons, description: "Hooks, Context, and performance" },
        { name: "Next.js", level: 85, icon: "SiNextdotjs" as keyof typeof SiIcons, description: "SSR, SSG, and App Router" },
        { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss" as keyof typeof SiIcons, description: "Utility-first styling" }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      color: "purple" as ColorType,
      items: [
        { name: "Laravel", level: 95, icon: "FaLaravel" as keyof typeof FaIcons, description: "MVC architecture and APIs" },
        { name: "Node.js", level: 85, icon: "FaNodeJs" as keyof typeof FaIcons, description: "Server-side JavaScript" },
        { name: "Express", level: 82, icon: "SiExpress" as keyof typeof SiIcons, description: "Web application framework" },
        { name: "Python", level: 80, icon: "FaPython" as keyof typeof FaIcons, description: "Scripting and automation" },
        { name: "RESTful APIs", level: 88, icon: "FaNodeJs" as keyof typeof FaIcons, description: "API design and integration" }
      ]
    },
    {
      category: "Database",
      icon: "🗄️",
      color: "green" as ColorType,
      items: [
        { name: "MongoDB", level: 85, icon: "SiMongodb" as keyof typeof SiIcons, description: "NoSQL document database" },
        { name: "PostgreSQL", level: 80, icon: "SiPostgresql" as keyof typeof SiIcons, description: "Relational database" },
        { name: "MySQL", level: 78, icon: "SiMysql" as keyof typeof SiIcons, description: "Popular SQL database" },
        { name: "Redis", level: 75, icon: "SiRedis" as keyof typeof SiIcons, description: "In-memory data structure" }
      ]
    },
    {
      category: "Tools & Others",
      icon: "🛠️",
      color: "orange" as ColorType,
      items: [
        { name: "Git", level: 90, icon: "FaGit" as keyof typeof FaIcons, description: "Version control system" },
        { name: "Docker", level: 75, icon: "FaDocker" as keyof typeof FaIcons, description: "Containerization platform" },
        { name: "AWS", level: 70, icon: "FaAws" as keyof typeof FaIcons, description: "Cloud computing services" },
        { name: "Firebase", level: 80, icon: "SiFirebase" as keyof typeof SiIcons, description: "Backend-as-a-Service" },
        { name: "WordPress", level: 85, icon: "FaWordpress" as keyof typeof FaIcons, description: "CMS and custom themes" },
        { name: "cPanel", level: 85, icon: "SiCpanel" as keyof typeof SiIcons, description: "Web hosting control panel" }
      ]
    }
  ],
  summaryStats: [
    { label: "Technologies Mastered", value: "20+", icon: "🚀", color: "blue" as ColorType },
    { label: "Years of Experience", value: "2+", icon: "⏰", color: "green" as ColorType },
    { label: "Projects Completed", value: "24+", icon: "✅", color: "purple" as ColorType },
    { label: "Always Learning", value: "∞", icon: "📚", color: "orange" as ColorType }
  ]
};

// Color mappings using CSS custom properties
const colorMappings = {
  blue: {
    primary: "59 130 246", // blue-500
    light: "147 197 253", // blue-300
    lighter: "219 234 254" // blue-100
  },
  purple: {
    primary: "168 85 247", // purple-500
    light: "196 181 253", // purple-300
    lighter: "243 232 255" // purple-100
  },
  green: {
    primary: "34 197 94", // green-500
    light: "134 239 172", // green-300
    lighter: "220 252 231" // green-100
  },
  orange: {
    primary: "249 115 22", // orange-500
    light: "251 146 60", // orange-400
    lighter: "254 215 170" // orange-100
  }
};

const Skills: React.FC = () => {
  const { skillCategories, summaryStats } = useMemo(() => skillsData, []);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const getSkillLevel = useCallback((level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Intermediate";
    return "Basic";
  }, []);

  const getSkillStatus = useCallback((level: number) => {
    if (level >= 90) return "Production Ready";
    if (level >= 80) return "Proficient";
    return "Learning";
  }, []);

  const currentCategory = useMemo(() => skillCategories[activeCategory], [activeCategory, skillCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
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
    }, 5000);

    return () => clearInterval(interval);
  }, [skillCategories.length]);

  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  // Icon component with error handling
  const IconComponent = ({ iconName, className }: { iconName: keyof typeof FaIcons | keyof typeof SiIcons; className?: string }) => {
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
                My Skills
              </h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p 
            className="mt-6 text-lg max-w-2xl mx-auto"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Technologies and tools I use to bring ideas to life
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.category}
              onClick={() => handleCategoryChange(index)}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border
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
              aria-label={`View ${category.category} skills`}
            >
              <span className="mr-2" role="img" aria-label={category.category}>
                {category.icon}
              </span>
              {category.category}
              <span className="ml-2 text-xs opacity-75">({category.items.length})</span>
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
                transitionDelay: `${index * 100}ms`,
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
                      {getSkillLevel(skill.level)}
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
                      transitionDelay: `${index * 100 + 300}ms`,
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
                  {skill.description}
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
                      {getSkillStatus(skill.level)}
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
                  transitionDelay: `${index * 100 + 800}ms`,
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))'
                }}
              >
                <div className="text-4xl mb-3" role="img" aria-label={stat.label}>
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
                  {stat.label}
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
                Ready to work together?
              </h3>
              <p 
                className="mb-6 max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                I'm always excited to take on new challenges and learn new technologies. Let's build something amazing!
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
              >
                Let's Connect
              </button>
            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  );
};

export default Skills;