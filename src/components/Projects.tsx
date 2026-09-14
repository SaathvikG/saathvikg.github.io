import { Section } from '@/components/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { projects } from '@/lib/content'
import SpotlightCard from '@/components/SpotlightCard'

export function Projects() {
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 28, stagger: 0.15, start: 'top 82%' })

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <SpotlightCard
            key={project.name}
            spotlightColor="rgba(123, 75, 54, 0.18)"
            className="group flex flex-col p-0 transition-colors hover:border-primary/40"
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
    </Section>
  )
}
