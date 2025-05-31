import { getArticlesByCategory, formatDate } from "@/lib/data"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/data"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const articles = getArticlesByCategory(params.slug)
  
  if (!articles.length) {
    notFound()
  }

  const categoryName = articles[0].category.name

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-xl text-gray-600">
          {articles.length} article{articles.length > 1 ? "s" : ""} dans cette catégorie
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <Link href={`/articles/${article.slug}`}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
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
                    <span
                      key={tag}
                      className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
