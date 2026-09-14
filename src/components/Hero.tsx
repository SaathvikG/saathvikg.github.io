import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { profile } from '@/lib/content'
import SplitText from '@/components/SplitText'
import Magnet from '@/components/Magnet'
import Iridescence from '@/components/Iridescence'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: no-preference)')
    setMotionOk(mq.matches)
    const onChange = () => setMotionOk(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-fade]', {
          opacity: 0,
          y: 16,
          duration: 0.8,
          delay: 0.9,
          stagger: 0.15,
          ease: 'power2.out'
        })
        gsap.to('[data-hero-cue]', {
          y: 6,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh items-center overflow-hidden px-6">
      {motionOk ? (
        <div aria-hidden="true" className="absolute inset-0 -z-30 opacity-40">
          <Iridescence color={[0.72, 0.56, 0.42]} amplitude={0.09} speed={0.45} mouseReact />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 [background:radial-gradient(60%_50%_at_20%_15%,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_70%),radial-gradient(50%_45%_at_85%_80%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background/15 via-background/55 to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(color-mix(in_oklab,var(--color-foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="mx-auto w-full max-w-5xl py-32">
        <p data-hero-fade className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {profile.school}
        </p>

        <SplitText
          text={profile.name}
          tag="h1"
          textAlign="left"
          className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          delay={22}
          duration={0.9}
          from={{ opacity: 0, y: 48 }}
          to={{ opacity: 1, y: 0 }}
        />

        <p data-hero-fade className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          {profile.role} · {profile.tagline}
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <Magnet padding={40} magnetStrength={4}>
            <a
              href="#projects"
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </Magnet>
          <Magnet padding={40} magnetStrength={4}>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Get in Touch
            </a>
          </Magnet>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        data-hero-cue
        className="absolute bottom-10 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
