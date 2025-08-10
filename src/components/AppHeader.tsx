import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { LanguageContext } from '@/i18n'
import { Home, ListOrdered, Languages } from 'lucide-react'

const logoSrc = "/lovable-uploads/61854de0-5d50-4e0f-ac06-21db335de547.png"

export default function AppHeader() {
  const { lang, setLang } = useContext(LanguageContext)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Dynamic Pro home">
          <img src={logoSrc} alt="Dynamic Pro logo" className="h-8 w-8 object-contain" loading="eager" />
          <span className="font-semibold tracking-tight text-brand">Dynamic Pro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors ${
                isActive ? 'bg-brand/10 text-brand' : 'hover:bg-accent hover:text-foreground'
              }`
            }
          >
            <Home className="opacity-80" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors ${
                isActive ? 'bg-brand/10 text-brand' : 'hover:bg-accent hover:text-foreground'
              }`
            }
          >
            <ListOrdered className="opacity-80" />
            <span>Transactions</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={lang === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Languages className="size-4" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
