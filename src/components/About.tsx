import { Section } from '@/components/Section'
import { profile, skills, interests } from '@/lib/content'
import CountUp from '@/components/CountUp'

const facts = [
  { label: 'Studying', value: 'EE & Materials Sci.' },
  { label: 'Expected', value: profile.gradYear },
  { label: 'Based in', value: profile.location }
]

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">{profile.bio}</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{profile.bioExtra}</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            When I'm not building
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent transition-colors hover:border-accent/60"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8 md:col-span-2 md:grid-cols-1 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">GPA</dt>
            <dd className="mt-1 font-heading text-lg text-foreground">
              <CountUp to={Number(profile.gpa)} duration={1.6} /> / 4.0
            </dd>
          </div>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1 font-heading text-lg text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
