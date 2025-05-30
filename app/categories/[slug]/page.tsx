import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ArticleCard } from "@/components/article-card"
import { getArticlesByCategory, getCategories, formatDate } from "@/lib/data"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getCategories()
  const category = categories.find((cat) => cat.slug === params.slug)
  const articles = getArticlesByCategory(params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto py-10 px-4 md:px-6">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux catégories
            </Button>
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
            <Badge variant="secondary">{category.count} articles</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Découvrez toutes nos recherches en {category.name.toLowerCase()}
          </p>
        </div>

        {/* Articles */}
        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                author={article.author.name}
				author_slug={article.author.slug}
                date={formatDate(article.publishedAt)}
                category={article.category.name}
                slug={article.slug}
                readTime={article.readTime}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun article dans cette catégorie</h3>
            <p className="text-muted-foreground">Les articles de cette catégorie seront bientôt disponibles.</p>
          </div>
        )}
      </div>
    </div>
  )
}
