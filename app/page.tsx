import Link from "next/link"
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import { Header } from "@/components/header"

import { getFeaturedArticles, getCategories, formatDate } from "@/lib/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/data"

const stats = [
  { icon: BookOpen, label: "Articles publiés", value: "1,247" },
  { icon: Users, label: "Chercheurs", value: "89" },
  { icon: TrendingUp, label: "Citations", value: "12,456" },
]

export default async function HomePage() {
  const [featuredArticles, categories] = await Promise.all([
    getFeaturedArticles(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                SDEAM
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Découvrez les dernières recherches et analyses scientifiques avec des données détaillées et des
                visualisations interactives.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/articles">
                <Button size="lg">
                  Explorer les articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                S'abonner à la newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Articles à la Une</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-sm text-gray-500">{formatDate(article.publishedAt.toISOString())}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="mr-4">{article.readTime}</span>
                    <span className="mr-4">{article.views} vues</span>
                    <span>{article.citations} citations</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Restez informé</CardTitle>
              <CardDescription>Recevez les dernières publications directement dans votre boîte mail</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-3 py-2 border border-input rounded-md"
              />
              <Button>S'abonner</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
