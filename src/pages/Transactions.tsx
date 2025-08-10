import { useContext, useMemo } from 'react'
import { LanguageContext, i18n } from '@/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import BackgroundGlow from '@/components/BackgroundGlow'
import { Bookmark, ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface Txn {
  date: string
  note: string
  debit?: number // money taken
  credit?: number // money paid in
}

const sample: Txn[] = [
  { date: '2025-08-05T20:28:00+02:00', note: 'Bank transfer in', credit: 199425 },
  { date: '2025-07-23T19:42:00+02:00', note: 'Bank transfer in', credit: 500000 },
  { date: '2025-07-08T14:55:00+02:00', note: 'Lens purchase', debit: 189420 },
  { date: '2025-07-08T14:53:00+02:00', note: 'Beans purchase', debit: 173250 },
  { date: '2025-07-01T20:20:00+02:00', note: 'Bank transfer in', credit: 500000 },
]

function formatCurrency(n: number, lang: 'en' | 'ar') {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-EG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export default function Transactions() {
  const { lang } = useContext(LanguageContext)
  const t = i18n[lang]

  const totals = useMemo(() => {
    const paidIn = sample.reduce((s, x) => s + (x.credit || 0), 0)
    const paidOut = sample.reduce((s, x) => s + (x.debit || 0), 0)
    const balance = paidIn - paidOut
    return { paidIn, paidOut, balance }
  }, [])

  document.title = `${t.appName} — ${t.transactions}`

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <LanguageSwitcher />
      <div className="container py-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">{t.transactions}</h1>

        <section className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl border bg-card p-5 card-elevated">
            <div className="text-sm text-muted-foreground mb-1 flex items-center justify-between">
              <span>{t.paidIn}</span>
              <ArrowUpRight className="text-success" />
            </div>
            <div className="text-2xl font-semibold text-success">
              {formatCurrency(totals.paidIn, lang)} {t.currency}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5 card-elevated">
            <div className="text-sm text-muted-foreground mb-1 flex items-center justify-between">
              <span>{t.paidOut}</span>
              <ArrowDownRight className="text-destructive" />
            </div>
            <div className="text-2xl font-semibold text-destructive">
              {formatCurrency(totals.paidOut, lang)} {t.currency}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5 card-elevated">
            <div className="text-sm text-muted-foreground mb-1 flex items-center justify-between">
              <span>{t.currentBalance}</span>
              <Bookmark className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold">
              {formatCurrency(totals.balance, lang)} {t.currency}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border bg-card card-elevated">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-muted-foreground">
                <th className="text-start p-3 whitespace-nowrap">{t.date}</th>
                <th className="text-start p-3">{t.note}</th>
                <th className="text-start p-3 whitespace-nowrap">{t.debit}</th>
                <th className="text-start p-3 whitespace-nowrap">{t.credit}</th>
                <th className="text-start p-3 whitespace-nowrap">{t.runningBalance}</th>
              </tr>
            </thead>
            <tbody>
              {sample.reduce<{ rows: JSX.Element[]; run: number }>((acc, x, idx) => {
                const delta = (x.credit || 0) - (x.debit || 0)
                const run = (acc.run || 0) + delta
                const date = new Date(x.date)
                const formattedDate = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', {
                  dateStyle: 'medium', timeStyle: 'short'
                }).format(date)
                acc.rows.push(
                  <tr key={idx} className="border-t">
                    <td className="p-3 whitespace-nowrap">{formattedDate}</td>
                    <td className="p-3">{x.note}</td>
                    <td className="p-3 whitespace-nowrap text-destructive">{x.debit ? `${formatCurrency(x.debit, lang)} ${t.currency}` : '-'}</td>
                    <td className="p-3 whitespace-nowrap text-success">{x.credit ? `${formatCurrency(x.credit, lang)} ${t.currency}` : '-'}</td>
                    <td className="p-3 whitespace-nowrap">{formatCurrency(run, lang)} {t.currency}</td>
                  </tr>
                )
                acc.run = run
                return acc
              }, { rows: [], run: 0 }).rows}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}
