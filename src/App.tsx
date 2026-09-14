import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Coursework } from '@/components/Coursework'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Coursework />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
