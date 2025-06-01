import { getArticleBySlug, getRelatedArticles, getAdjacentArticles } from "@/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleNavigation } from "@/components/article-navigation"
import { ArticleHeader } from "@/components/article-header"
import { RelatedArticles } from "@/components/related-articles"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// 🔍 Génération dynamique des métadonnées
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article non trouvé",
      description: "L'article recherché est introuvable.",
      robots: { index: false, follow: false },
    }
  }

  const ogImage = `https://climate-impact-news.com/og-images/${article.slug}.jpg`

  return {
    title: `${article.title} | Climate Impact News`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Climate Impact News`,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      siteName: "Climate Impact News",
      url: `https://climate-impact-news.com/articles/${article.slug}`,
      locale: "fr_FR"
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Climate Impact News`,
      description: article.description,
      images: [ogImage],
      site: "@ClimateImpactNews",
      creator: "@ClimateImpactNews"
    },
    alternates: {
      canonical: `https://climate-impact-news.com/articles/${article.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  }
}

// 📰 Page principale
export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) notFound()

  const [relatedArticles, adjacentArticles] = await Promise.all([
    getRelatedArticles(params.slug),
    getAdjacentArticles(params.slug)
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ReadingProgress />
      
      <div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
        <ArticleHeader article={article} />

        <Separator className="mb-8" />

        <article className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag.id} variant="outline">{tag.name}</Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <ArticleNavigation
          currentSlug={params.slug}
          previous={adjacentArticles.previous}
          next={adjacentArticles.next}
        />

        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </div>
    </div>
  )
}
