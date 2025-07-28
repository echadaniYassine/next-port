'use client'
import { useState, useEffect, useRef } from 'react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const skillsRef = useRef(null)
  const [counters, setCounters] = useState({ TechnologiesMastered: 0, projects: 0, Experience: 0 })

  const skillCategories = [
    {
      category: "Frontend",
      icon: "🎨",
      color: "blue",
      items: [
        { name: "HTML5", level: 95, icon: "📄" },
        { name: "CSS3", level: 90, icon: "🎨" },
        { name: "JavaScript", level: 92, icon: "⚡" },
        { name: "React", level: 88, icon: "⚛️" },
        { name: "Next.js", level: 85, icon: "🚀" },
        { name: "Tailwind CSS", level: 90, icon: "💨" }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      color: "purple",
      items: [
        { name: "Laravel", level: 95, icon: "🟢" },
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Express", level: 82, icon: "🚄" },
        { name: "Python", level: 80, icon: "🐍" },
        { name: "RESTful APIs", level: 88, icon: "🔗" }
      ]
    },
    {
      category: "Database",
      icon: "🗄️",
      color: "green",
      items: [
        { name: "MongoDB", level: 85, icon: "🍃" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "MySQL", level: 78, icon: "🗃️" },
      ]
    },
    {
      category: "Tools & Others",
      icon: "🛠️",
      color: "orange",
      items: [
        { name: "Git", level: 90, icon: "📝" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" },
        { name: "Firebase", level: 80, icon: "🔥" },
        { name: "Wordpress", level: 85, icon: "🎨" },
        { name: "Cpanel", level: 85, icon: "🎨" }


      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % skillCategories.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        light: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500'
      },
      purple: {
        bg: 'bg-purple-500',
        light: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500'
      },
      green: {
        bg: 'bg-green-500',
        light: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-500'
      },
      orange: {
        bg: 'bg-orange-500',
        light: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-500'
      }
    }
    return colors[color][type] || ''
  }

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === index
                ? `${getColorClasses(category.color, 'light')} ${getColorClasses(category.color, 'text')} shadow-lg`
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories[activeCategory].items.map((skill, index) => (
            <div
              key={skill.name}
              className={`bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 dark:border-gray-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${getColorClasses(skillCategories[activeCategory].color, 'light')} rounded-xl flex items-center justify-center text-xl`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <span className={`text-sm font-medium ${getColorClasses(skillCategories[activeCategory].color, 'text')}`}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 ${getColorClasses(skillCategories[activeCategory].color, 'bg')} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 300}ms`
                    }}
                  ></div>
                </div>
              </div>

              {/* Skill Description */}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level >= 90 ? 'Expert' :
                      skill.level >= 80 ? 'Advanced' :
                        skill.level >= 70 ? 'Intermediate' : 'Basic'}
                  </span>
                  <div className={`w-2 h-2 ${getColorClasses(skillCategories[activeCategory].color, 'bg')} rounded-full animate-pulse`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Technologies Mastered', value: '15+', icon: '🚀' },
            { label: 'Years of Experience', value: '5+', icon: '⏰' },
            { label: 'Projects Completed', value: '50+', icon: '✅' },
            { label: 'Always Learning', value: '∞', icon: '📚' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100 + 800}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills