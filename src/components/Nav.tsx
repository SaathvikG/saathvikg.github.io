import { useEffect, useState } from 'react'
import { navLinks, profile } from '@/lib/content'
import Magnet from '@/components/Magnet'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => !!el)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-border/80 bg-background/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-heading text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Magnet padding={30} magnetStrength={6} wrapperClassName="inline-block" innerClassName="inline-block">
                <a
                  href={link.href}
                  data-active={active === link.href}
                  className="group relative inline-block px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-primary"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100" />
                </a>
              </Magnet>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d={open ? 'M4 4L16 16M16 4L4 16' : 'M2 5H18M2 10H18M2 15H18'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`grid overflow-hidden border-b border-border/80 bg-background/95 backdrop-blur-md transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul className="min-h-0 px-6 pb-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
