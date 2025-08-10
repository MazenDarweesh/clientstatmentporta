import React from 'react'

export default function BackgroundGlow() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mql.matches) {
      window.addEventListener('mousemove', onMove)
    }
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-soft-glow"
      style={{
        maskImage:
          'radial-gradient(600px 400px at var(--mx, 50%) var(--my, 20%), black 30%, transparent 60%)',
        WebkitMaskImage:
          'radial-gradient(600px 400px at var(--mx, 50%) var(--my, 20%), black 30%, transparent 60%)',
        opacity: 0.9,
      }}
    />
  )
}
