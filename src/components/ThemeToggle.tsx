import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8.5 1v2M8.5 14v2M16 8.5h-2M3 8.5H1M13.7 3.3l-1.4 1.4M4.7 12.3l-1.4 1.4M13.7 13.7l-1.4-1.4M4.7 4.7 3.3 3.3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <path
            d="M14.5 9.8A6 6 0 0 1 7.2 2.5a6 6 0 1 0 7.3 7.3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
