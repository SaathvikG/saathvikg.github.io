import { Section } from '@/components/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { coursework } from '@/lib/content'
import GlareHover from '@/components/GlareHover'

export function Coursework() {
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 20, stagger: 0.06, start: 'top 85%' })

  return (
    <Section id="coursework" eyebrow="Coursework" title="What I'm studying">
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
        {coursework.map((course) => (
          <GlareHover
            key={course.code}
            width="100%"
            height="100%"
            background="var(--color-card)"
            borderColor="var(--color-border)"
            borderRadius="var(--radius-lg)"
            glareColor="#EFE6D8"
            glareOpacity={0.5}
            glareAngle={-30}
            glareSize={220}
            transitionDuration={600}
            className="block h-full cursor-default p-5 text-left transition-colors hover:border-primary/40"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-xs text-primary">{course.code}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {course.semester}
              </span>
            </div>
            <h3 className="mt-1.5 font-heading text-base text-foreground">{course.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
          </GlareHover>
        ))}
      </div>
    </Section>
  )
}
