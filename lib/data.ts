import articlesData from "@/data/articles.json"
import authorsData from "@/data/authors.json"

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: {
    name: string
    slug: string
  }
  publishedAt: string
  readTime: string
  category: {
    name: string
    slug: string
  }
  tags: string[]
  featured: boolean
  views: number
  citations: number
}

export interface Author {
  name: string
  slug: string
  title: string
  affiliation: string
  bio: string
  expertise: string[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  contact: {
    email: string
    twitter?: string
    linkedin?: string
    orcid?: string
    researchgate?: string
  }
  stats: {
    articles: number
    citations: number
    hIndex: number
  }
  avatar: string
}

export function getAllArticles(): Article[] {
  return articlesData.articles
}

export function getFeaturedArticles(): Article[] {
  return articlesData.articles.filter((article) => article.featured)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.articles.find((article) => article.slug === slug)
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return articlesData.articles.filter((article) => article.author.slug === authorSlug)
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articlesData.articles.filter((article) => article.category.slug === categorySlug)
}

export function getAllAuthors(): Author[] {
  return authorsData.authors
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authorsData.authors.find((author) => author.slug === slug)
}

export function getRelatedArticles(currentArticleSlug: string, limit = 2): Article[] {
  const currentArticle = getArticleBySlug(currentArticleSlug)
  if (!currentArticle) return []

  const relatedArticles = articlesData.articles
    .filter(
      (article) =>
        article.slug !== currentArticleSlug &&
        (article.category.slug === currentArticle.category.slug ||
          article.tags.some((tag) => currentArticle.tags.includes(tag))),
    )
    .slice(0, limit)

  return relatedArticles
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCategories(): { name: string; slug: string; count: number }[] {
  const categories = new Map<string, { name: string; slug: string; count: number }>()

  articlesData.articles.forEach((article) => {
    const category = categories.get(article.category.slug)
    if (category) {
      category.count++
    } else {
      categories.set(article.category.slug, {
        name: article.category.name,
        slug: article.category.slug,
        count: 1,
      })
    }
  })

  return Array.from(categories.values()).sort((a, b) => b.count - a.count)
}

export function getAdjacentArticles(currentArticleSlug: string): {
  previous: Article | null
  next: Article | null
} {
  const articles = getAllArticles()
  const currentIndex = articles.findIndex(article => article.slug === currentArticleSlug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  }
}
