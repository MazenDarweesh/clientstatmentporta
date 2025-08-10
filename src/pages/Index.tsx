import { useContext, useMemo } from 'react'
import { i18n, LanguageContext } from '@/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import BackgroundGlow from '@/components/BackgroundGlow'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const BalanceCard: React.FC<{ name: string; balance: number }> = ({ name, balance }) => {
  const { lang } = useContext(LanguageContext)
  const t = i18n[lang]
  const formatted = useMemo(() =>
    new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balance),
  [balance, lang])

  return (
    <section className="w-full max-w-2xl mx-auto">
      <article className="rounded-2xl border bg-card p-6 md:p-8 card-elevated">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-12 rounded-xl bg-accent flex items-center justify-center">
            <Home className="text-foreground/70" />
          </div>
          <div className="font-semibold text-lg">{name}</div>
        </div>

        <h2 className="text-muted-foreground text-sm mb-1">{t.balanceTitle}</h2>
        <p className="text-4xl md:text-5xl font-semibold tracking-wide text-destructive mb-4">
          {formatted} {t.currency}
        </p>

        <p className="text-muted-foreground mb-1">{t.description}</p>
        <p className="text-muted-foreground mb-6">{t.description2}</p>

        <div className="flex">
          <Button asChild variant="hero" className="w-full md:w-auto">
            <Link to="/transactions">{t.seeHistory}</Link>
          </Button>
        </div>
      </article>
    </section>
  )
}

const PaymentRow = () => (
  <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground">
    <span className="px-2 py-1 rounded-md bg-secondary">VISA</span>
    <span className="px-2 py-1 rounded-md bg-secondary">Mastercard</span>
    <span className="px-2 py-1 rounded-md bg-secondary">Meeza</span>
    <span className="px-2 py-1 rounded-md bg-secondary">Fawry</span>
    <span className="px-2 py-1 rounded-md bg-secondary">ValU</span>
  </div>
)

export default function Index() {
  const { lang } = useContext(LanguageContext)
  const t = i18n[lang]

  // Basic SEO per page
  document.title = `${t.appName} — ${t.balanceTitle}`

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <LanguageSwitcher />
      <div className="container pb-16 pt-6">
        <h1 className="sr-only">{t.appName}</h1>
        <BalanceCard name={lang === 'ar' ? 'ابوالحسن والحسين' : 'Abou Alhassan & Alhussain'} balance={6013.25} />
        <PaymentRow />
      </div>
    </main>
  )
}
