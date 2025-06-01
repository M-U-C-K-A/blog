import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Article } from "@/lib/definitions"
import { getInitials, formatDate } from "@/lib/data"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
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
              <AvatarImage src={`/avatars/${article.author.slug}.svg`} alt={article.author.name} />
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
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
