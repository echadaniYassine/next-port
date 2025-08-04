import { useEffect, useState } from "react"
import { SectionDecorator } from "./SectionDecorator"

export default function RoleDisplay({ currentRoleData, t }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(false)
    const timeout = setTimeout(() => {
      setAnimate(true)
    }, 10)
    return () => clearTimeout(timeout)
  }, [currentRoleData])

  return (
    <div className="min-h-[60px] sm:min-h-[80px] flex flex-col items-center justify-center space-y-3">
      <SectionDecorator variant="default">
        <p
          className={`text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r ${currentRoleData.gradient} bg-clip-text text-transparent transition-all duration-1000 ease-in-out ${
            animate ? "animate-role-gradient" : ""
          }`}
        >
          {t(currentRoleData.textKey)}
        </p>
      </SectionDecorator>
    </div>
  )
}
