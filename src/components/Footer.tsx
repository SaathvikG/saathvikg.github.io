import { profile } from '@/lib/content'
import Magnet from '@/components/Magnet'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <Magnet padding={30} magnetStrength={6}>
          <a href="#top" className="transition-colors hover:text-primary">
            Back to top ↑
          </a>
        </Magnet>
      </div>
    </footer>
  )
}
