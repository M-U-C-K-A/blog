import Link from "next/link"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sub } from "@radix-ui/react-context-menu"
import { SubscribeButton } from "./subscribe"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">SDEAM</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Accueil
          </Link>
          <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Catégories
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <SubscribeButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
