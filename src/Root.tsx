import { LanguageProvider } from '@/i18n'
import App from './App'

export default function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  )
}
