import type { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = ''
}: {
  id: string
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
}) {
  const ref = useScrollReveal<HTMLDivElement>({ y: 20, stagger: 0.15 })

  return (
    <section id={id} className={`relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32 ${className}`}>
      <div ref={ref}>
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-medium text-foreground md:text-4xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
