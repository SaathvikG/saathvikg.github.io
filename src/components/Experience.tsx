import { useRef } from 'react'
import { Section } from '@/components/Section'
import { experience } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      if (!listRef.current) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-timeline-line]', {
          scaleY: 0,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6
          }
        })
        gsap.from('[data-timeline-item]', {
          opacity: 0,
          x: -16,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })
      return () => mm.revert()
    },
    { scope: listRef }
  )

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol ref={listRef} className="relative">
        <span
          data-timeline-line
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
        />
        {experience.map((item) => (
          <li key={`${item.org}-${item.role}`} data-timeline-item className="relative pb-12 pl-9 last:pb-0">
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-lg text-foreground">{item.role}</h3>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{item.period}</span>
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-primary">
              {item.org}
              <span className="text-muted-foreground">· {item.location}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.tag}
              </span>
            </p>
            <ul className="mt-3 space-y-1.5">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
