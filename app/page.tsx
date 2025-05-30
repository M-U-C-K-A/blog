import Link from "next/link"
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import { Header } from "@/components/header"


import { getFeaturedArticles, formatDate } from "@/lib/data"

const featuredArticles = getFeaturedArticles()

const stats = [
  { icon: BookOpen, label: "Articles publiés", value: "1,247" },
  { icon: Users, label: "Chercheurs", value: "89" },
  { icon: TrendingUp, label: "Citations", value: "12,456" },
]

export default function Home() {
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

      {/* Latest Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Derniers articles</h2>
              <p className="text-muted-foreground mt-2">
                Découvrez les recherches les plus récentes de notre communauté scientifique
              </p>
            </div>
            <Link href="/articles">
              <Button variant="outline">
                Voir tous les articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
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
              />            ))}
          </div>
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
