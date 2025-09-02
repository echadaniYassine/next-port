// src/data/skills/skillsData.ts
import type { SkillsData, SkillCategory, SummaryStat } from './types';

// Skills Categories Data
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    shortCategory: "Lang",
    icon: "💻",
    color: "indigo",
    items: [
      {
        name: "HTML5",
        level: 95,
        icon: "FaHtml5",
        description: "Semantic markup, accessibility, and modern web standards"
      },
      {
        name: "CSS3",
        level: 95,
        icon: "FaCss3Alt",
        description: "Responsive design, Flexbox, Grid, and animations"
      },
      {
        name: "JavaScript",
        level: 90,
        icon: "FaJs",
        description: "ES6+, DOM manipulation, async programming"
      },
      {
        name: "PHP",
        level: 92,
        icon: "FaPhp",
        description: "Server-side scripting, dynamic web applications"
      },
      {
        name: "Dart",
        level: 80,
        icon: "SiDart",
        description: "Strongly typed language, used with Flutter for cross-platform apps"
      },
      {
        name: "C",
        level: 90,
        icon: "SiC",
        description: "Low-level programming, memory management, system development"
      },
      {
        name: "C++",
        level: 90,
        icon: "SiCplusplus",
        description: "Object-oriented programming, performance-critical applications"
      },
      {
        name: "Java",
        level: 88,
        icon: "FaJava",
        description: "Object-oriented programming, Spring Boot, and enterprise applications"
      },
      {
        name: "Python",
        level: 80,
        icon: "FaPython",
        description: "Scripting and automation"
      },
      {
        name: "SQL",
        level: 88,
        icon: "SiMysql", // or SiPostgresql, depending on your focus
        description: "Database querying and management"
      }
    ]
  },
  {
    category: "Frontend",
    shortCategory: "Front", // Add this
    icon: "🎨",
    color: "blue",
    items: [
      {
        name: "React",
        level: 92,
        icon: "FaReact",
        description: "Hooks, Context, and performance"
      },
      {
        name: "Next.js",
        level: 80,
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
    shortCategory: "Back", // Add this
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
        level: 90,
        icon: "SiExpress",
        description: "Web application framework"
      },
      {
        name: "RESTful APIs",
        level: 90,
        icon: "FaNodeJs",
        description: "API design and integration"
      }
    ]
  },
  {
    category: "Database",
    shortCategory: "DB", // Add this
    icon: "🗄️",
    color: "green",
    items: [
      {
        name: "MongoDB",
        level: 95,
        icon: "SiMongodb",
        description: "NoSQL document database"
      },
      {
        name: "PostgreSQL",
        level: 75,
        icon: "SiPostgresql",
        description: "Relational database"
      },
      {
        name: "MySQL",
        level: 95,
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
    shortCategory: "Tools", // Add this
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
        level: 78,
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
      },
      {
        name: "Canvas",
        level: 85,
        icon: "FaPaintBrush", // You can use FaPaintBrush, or SiCanvas if you prefer a specific brand
        description: "Drawing and rendering graphics using HTML5 Canvas API"
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