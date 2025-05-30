import Link from "next/link"
import { BookOpen, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { getCategories, getArticlesByCategory } from "@/lib/data"

const categories = getCategories()

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Catégories scientifiques</h1>
          <p className="text-xl text-muted-foreground">Explorez nos recherches par domaine d'expertise</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{categories.length}</div>
              <p className="text-sm text-muted-foreground">Domaines de recherche</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{categories.reduce((total, cat) => total + cat.count, 0)}</div>
              <p className="text-sm text-muted-foreground">Articles publiés</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(categories.reduce((total, cat) => total + cat.count, 0) / categories.length)}
              </div>
              <p className="text-sm text-muted-foreground">Articles par catégorie</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryArticles = getArticlesByCategory(category.slug)
            const recentArticle = categoryArticles[0]

            return (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{category.count} articles</Badge>
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>
                      {recentArticle ? `Dernier article: ${recentArticle.title}` : "Aucun article disponible"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Découvrez les dernières recherches en {category.name.toLowerCase()}
                      </p>
                      {recentArticle && (
                        <p className="text-xs text-muted-foreground">Par {recentArticle.author.name}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
