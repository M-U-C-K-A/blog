import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials, formatDate } from "@/lib/data"
import { Article } from "@/lib/types"

interface RelatedArticlesProps {
  articles: Article[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Articles recommandés</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{article.description}</p>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`/avatars/${article.author.slug}.svg`} alt={article.author.name} />
                <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{article.author.name}</div>
                <div className="text-sm text-gray-500">
                {formatDate(article.publishedAt.toISOString())} · {article.readTime}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
} 
