// src/data/skills/skillsData.ts
import type { SkillsData, SkillCategory, SummaryStat } from './types';

// Skills Categories Data
export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "blue",
    items: [
      { 
        name: "HTML5", 
        level: 95, 
        icon: "FaHtml5", 
        description: "Semantic markup and accessibility" 
      },
      { 
        name: "CSS3", 
        level: 90, 
        icon: "FaCss3Alt", 
        description: "Modern styling and animations" 
      },
      { 
        name: "JavaScript", 
        level: 92, 
        icon: "FaJs", 
        description: "ES6+ and modern features" 
      },
      { 
        name: "React", 
        level: 88, 
        icon: "FaReact", 
        description: "Hooks, Context, and performance" 
      },
      { 
        name: "Next.js", 
        level: 85, 
        icon: "SiNextdotjs", 
        description: "SSR, SSG, and App Router" 
      },
      { 
        name: "Tailwind CSS", 
        level: 90, 
        icon: "SiTailwindcss", 
        description: "Utility-first styling" 
      }
    ]
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "purple",
    items: [
      { 
        name: "Laravel", 
        level: 95, 
        icon: "FaLaravel", 
        description: "MVC architecture and APIs" 
      },
      { 
        name: "Node.js", 
        level: 85, 
        icon: "FaNodeJs", 
        description: "Server-side JavaScript" 
      },
      { 
        name: "Express", 
        level: 82, 
        icon: "SiExpress", 
        description: "Web application framework" 
      },
      { 
        name: "Python", 
        level: 80, 
        icon: "FaPython", 
        description: "Scripting and automation" 
      },
      { 
        name: "RESTful APIs", 
        level: 88, 
        icon: "FaNodeJs", 
        description: "API design and integration" 
      }
    ]
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "green",
    items: [
      { 
        name: "MongoDB", 
        level: 85, 
        icon: "SiMongodb", 
        description: "NoSQL document database" 
      },
      { 
        name: "PostgreSQL", 
        level: 80, 
        icon: "SiPostgresql", 
        description: "Relational database" 
      },
      { 
        name: "MySQL", 
        level: 78, 
        icon: "SiMysql", 
        description: "Popular SQL database" 
      },
      { 
        name: "Redis", 
        level: 75, 
        icon: "SiRedis", 
        description: "In-memory data structure" 
      }
    ]
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    color: "orange",
    items: [
      { 
        name: "Git", 
        level: 90, 
        icon: "FaGit", 
        description: "Version control system" 
      },
      { 
        name: "Docker", 
        level: 75, 
        icon: "FaDocker", 
        description: "Containerization platform" 
      },
      { 
        name: "AWS", 
        level: 70, 
        icon: "FaAws", 
        description: "Cloud computing services" 
      },
      { 
        name: "Firebase", 
        level: 80, 
        icon: "SiFirebase", 
        description: "Backend-as-a-Service" 
      },
      { 
        name: "WordPress", 
        level: 85, 
        icon: "FaWordpress", 
        description: "CMS and custom themes" 
      },
      { 
        name: "cPanel", 
        level: 85, 
        icon: "SiCpanel", 
        description: "Web hosting control panel" 
      }
    ]
  }
];

// Summary Statistics Data
export const summaryStats: SummaryStat[] = [
  { 
    label: "Technologies Mastered", 
    value: "20+", 
    icon: "🚀", 
    color: "blue" 
  },
  { 
    label: "Years of Experience", 
    value: "2+", 
    icon: "⏰", 
    color: "green" 
  },
  { 
    label: "Projects Completed", 
    value: "24+", 
    icon: "✅", 
    color: "purple" 
  },
  { 
    label: "Always Learning", 
    value: "∞", 
    icon: "📚", 
    color: "orange" 
  }
];

// Combined Skills Data
export const skillsData: SkillsData = {
  skillCategories,
  summaryStats
};

// Helper Functions
export const getSkillLevel = (level: number): string => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Intermediate";
  return "Basic";
};

export const getSkillStatus = (level: number): string => {
  if (level >= 90) return "Production Ready";
  if (level >= 80) return "Proficient";
  return "Learning";
};