import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/data"
import Link from "next/link"
import { ArrowLeft, Share2, Bookmark, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleNavigation } from "@/components/article-navigation"
import { ArticleHeader } from "@/components/article-header"
import { RelatedArticles } from "@/components/related-articles"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article non trouvé",
      description: "L'article que vous recherchez n'existe pas."
    }
  }

  const faviconUrl = `/avatars/${article.slug}.svg`;

  return {
    title: `${article.title} | Climate Impact News`,
    description: article.description,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${article.title} | Climate Impact News`,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: faviconUrl,
          width: 64,
          height: 64,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${article.title} | Climate Impact News`,
      description: article.description,
      images: [faviconUrl],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(params.slug)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ReadingProgress />

      <div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
        {/* Navigation */}

        {article && <ArticleHeader article={article} />}

        <Separator className="mb-8" />

        {/* Article Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none mb-12">
          {article.content}
        </article>

        {/* Tags */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Article Navigation */}
        {article && <ArticleNavigation currentSlug={article.id} />}

        {/* Related Articles */}
        {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
      </div>
    </div>
  )
}
