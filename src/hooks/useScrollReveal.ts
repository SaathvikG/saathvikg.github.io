import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface RevealOptions {
  y?: number
  stagger?: number
  duration?: number
  start?: string
}

export function useScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const { y = 24, stagger = 0.08, duration = 0.6, start = 'top 85%' } = options
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      if (!ref.current || ref.current.children.length === 0) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current!.children, {
          opacity: 0,
          y,
          duration,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none reverse'
          }
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return ref
}
