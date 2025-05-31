import { getAllArticles } from "@/lib/data"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials, formatDate } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tous les Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <Link href={`/articles/${article.slug}`}>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {article.category.name}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/avatars/${article.author.slug}.svg`} />
                    <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="mr-4">{article.readTime}</span>
                  <span className="mr-4">{article.views} vues</span>
                  <span>{article.citations} citations</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
    </>
  )
}
