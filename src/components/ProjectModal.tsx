import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/lib/content'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={project.name} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="animate-in fade-in absolute inset-0 cursor-default bg-foreground/70 backdrop-blur-sm duration-200"
      />

      <div className="animate-in fade-in zoom-in-95 relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl duration-200">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-y-auto">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full max-h-[55vh] object-contain bg-muted"
          />
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-2xl text-foreground">{project.name}</h3>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.period}</span>
            </div>
            <p className="mt-3 text-base text-primary">{project.description}</p>
            <ul className="mt-5 space-y-2">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
