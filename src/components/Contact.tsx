import { Section } from '@/components/Section'
import { profile } from '@/lib/content'
import Magnet from '@/components/Magnet'

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    download: false,
    icon: (
      <path
        d="M2.5 5.5A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Z M2.8 5.2 10 10.5l7.2-5.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )
  },
  {
    label: 'LinkedIn',
    value: 'saathvik-gubbala',
    href: profile.linkedin,
    download: false,
    icon: (
      <path
        d="M5.5 8.5v6M5.5 5.75v.01M9 14.5v-4c0-1.1.9-2 2-2s2 .9 2 2v4M9 10.5v4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/Saathvik-Gubbala-Resume.pdf',
    download: true,
    icon: (
      <path
        d="M10 3v9.5M6.5 9l3.5 3.5L13.5 9M4 15.5h12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )
  }
]

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <p className="max-w-xl text-lg text-muted-foreground">
        Always glad to talk hardware, embedded systems, or anything in between — and open to internship and job
        opportunities. Reach out directly, or find me on LinkedIn.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {links.map((link) => (
          <Magnet key={link.label} padding={50} magnetStrength={4}>
            <a
              href={link.href}
              download={link.download}
              target={!link.download && link.href.startsWith('http') ? '_blank' : undefined}
              rel={!link.download && link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 transition-colors hover:border-primary/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  {link.icon}
                </svg>
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {link.label}
                </span>
                <span className="block font-heading text-base text-foreground">{link.value}</span>
              </span>
            </a>
          </Magnet>
        ))}
      </div>
    </Section>
  )
}
