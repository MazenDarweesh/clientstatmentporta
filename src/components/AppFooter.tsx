import { Globe, ExternalLink } from 'lucide-react'

export default function AppFooter() {
  return (
    <footer className="mt-12 border-t border-border/60 bg-background/80">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Globe className="opacity-80" />
          <span>© {new Date().getFullYear()} Dynamic Pro</span>
        </div>
        <a
          href="https://egydynamic.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          aria-label="Visit egydynamic.com"
        >
          egydynamic.com
          <ExternalLink className="size-4" />
        </a>
      </div>
    </footer>
  )
}
