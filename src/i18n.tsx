export type Language = 'en' | 'ar'

export const i18n = {
  en: {
    appName: 'Inyad-style Wallet',
    balanceTitle: 'Current situation',
    seeHistory: 'See transaction history',
    description:
      'Hello, this is your balance for the period Aug 25, 2022 to Aug 5, 2025.',
    description2:
      'Click "See transaction history" if you want to view your entire transaction history.',
    currency: 'egp',
    transactions: 'Transactions',
    currentBalance: 'Current balance',
    paidIn: 'Paid in',
    paidOut: 'Paid out',
    date: 'Date',
    note: 'Note',
    debit: 'Debit',
    credit: 'Credit',
    runningBalance: 'Running balance',
  },
  ar: {
    appName: 'محفظة شبيهة إنـيـاد',
    balanceTitle: 'الوضع الحالي',
    seeHistory: 'رؤية تقرير المعاملات',
    description: 'مرحباً، هذا رصيدك للفترة 25 أغسطس 2022 إلى 5 أغسطس 2025.',
    description2: 'اضغط على "رؤية تقرير المعاملات" لرؤية جميع المعاملات.',
    currency: 'ج.م',
    transactions: 'سجل المعاملات',
    currentBalance: 'الرصيد الحالي',
    paidIn: 'الذي تم دفعه',
    paidOut: 'الذي تم أخذه',
    date: 'التاريخ',
    note: 'ملاحظة',
    debit: 'مدين',
    credit: 'دائن',
    runningBalance: 'الرصيد التراكمي',
  },
} as const

import React from 'react'

export const LanguageContext = React.createContext<{
  lang: Language
  setLang: (l: Language) => void
}>({ lang: 'en', setLang: () => {} })

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = React.useState<Language>('en')

  React.useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
