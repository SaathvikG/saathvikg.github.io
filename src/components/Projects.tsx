import { useRef, useState } from 'react'
import { Section } from '@/components/Section'
import { gsap, useGSAP } from '@/lib/gsap'
import { projects, type Project } from '@/lib/content'
import SpotlightCard from '@/components/SpotlightCard'
import { ProjectModal } from '@/components/ProjectModal'

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid) return
      const cards = Array.from(grid.children) as HTMLElement[]
      const total = cards.length

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card, index) => {
          const angle = (index / total) * 360 - 110
          const radians = (angle * Math.PI) / 180

          gsap.fromTo(
            card,
            {
              x: Math.sin(radians) * 260,
              y: Math.cos(radians + 0.5) * 150 - 40,
              z: Math.cos(radians) * -420,
              rotateY: -Math.sin(radians) * 55,
              rotateZ: -Math.sin(radians) * 12,
              scale: 0.6,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              z: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: grid,
                start: 'top 95%',
                end: 'top 35%',
                scrub: 0.6
              }
            }
          )
        })
      })
      return () => mm.revert()
    },
    { scope: gridRef, dependencies: [projects.length] }
  )

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-2"
        style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
      >
        {projects.map((project) => (
          <SpotlightCard
            key={project.name}
            spotlightColor="rgba(123, 75, 54, 0.18)"
            className="group flex cursor-pointer flex-col p-0 transition-colors hover:border-primary/40"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
            role="button"
            tabIndex={0}
            onClick={() => setSelected(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelected(project)
              }
            }}
          >
            <div className="overflow-hidden border-b border-border bg-muted">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                width={1200}
                height={800}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading text-lg text-foreground">{project.name}</h3>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.period}</span>
              </div>
              <p className="mt-2 text-sm text-primary">{project.description}</p>
              <ul className="mt-4 space-y-1.5">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}
