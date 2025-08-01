import { Suspense } from "react"
import dynamic from "next/dynamic"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Loading from "./Loading"

// Dynamic imports for better performance
const About = dynamic(() => import("../components/About"), {
  loading: () => <Loading />,
})
const Skills = dynamic(() => import("../components/Skills"), {
  loading: () => <Loading />,
})
const Projects = dynamic(() => import("../components/Projects"), {
  loading: () => <Loading />,
})
const Contact = dynamic(() => import("../components/Contact"), {
  loading: () => <Loading />,
})

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
      {/* mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
    </main>
  )
}
