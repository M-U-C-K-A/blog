import { Header } from "@/components/header"
import { SearchArticles } from "@/components/search-articles"

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Tous les articles</h1>
          <p className="text-xl text-muted-foreground">
            Explorez notre collection complète de recherches scientifiques
          </p>
        </div>

        <SearchArticles />
      </div>
    </div>
  )
}
