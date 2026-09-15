import { useEffect, useRef, useState, type PointerEventHandler } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/lib/content'

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
  const [dragging, setDragging] = useState(false)

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

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [project.name])

  const clampPan = (next: { x: number; y: number }, z: number) => {
    const el = viewportRef.current
    if (!el) return next
    const maxX = ((z - 1) * el.clientWidth) / 2
    const maxY = ((z - 1) * el.clientHeight) / 2
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y))
    }
  }

  const applyZoom = (next: number) => {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
    setZoom(z)
    if (z === MIN_ZOOM) {
      setPan({ x: 0, y: 0 })
    } else {
      setPan((p) => clampPan(p, z))
    }
  }

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (zoom === MIN_ZOOM) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, originX: pan.x, originY: pan.y }
    setDragging(true)
  }

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setPan(clampPan({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy }, zoom))
  }

  const endDrag: PointerEventHandler<HTMLDivElement> = () => {
    dragRef.current = null
    setDragging(false)
  }

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
          <div
            ref={viewportRef}
            className="relative h-[55vh] w-full touch-none overflow-hidden bg-muted"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              draggable={false}
              className="h-full w-full select-none object-contain"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transition: dragging ? 'none' : 'transform 200ms ease-out',
                cursor: zoom > MIN_ZOOM ? (dragging ? 'grabbing' : 'grab') : 'default'
              }}
            />

            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => applyZoom(zoom - ZOOM_STEP)}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/85 disabled:pointer-events-none disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => applyZoom(zoom + ZOOM_STEP)}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/85 disabled:pointer-events-none disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

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
