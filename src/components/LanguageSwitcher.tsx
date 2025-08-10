import { useContext } from 'react'
import { LanguageContext, i18n, type Language } from '@/i18n'
import { Globe } from 'lucide-react'

const langs: { id: Language; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'العربية' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useContext(LanguageContext)
  const t = i18n[lang]
  return (
    <header className="w-full flex justify-center py-4 text-sm text-muted-foreground">
      <nav className="flex items-center gap-3">
        <Globe className="opacity-70" />
        {langs.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setLang(l.id)}
            aria-current={lang === l.id}
            className={
              `px-2 py-1 rounded-md transition-colors ` +
              (lang === l.id
                ? 'text-brand bg-brand/10'
                : 'hover:text-foreground hover:bg-accent')
            }
          >
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
