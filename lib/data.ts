import { db } from './db'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export async function getAllArticles() {
  const articles = await db.article.findMany({
    include: {
      author: true,
      category: {
        include: {
          _count: {
            select: { articles: true }
          }
        }
      },
      tags: true,
    },
  })
  return articles
}

export async function getCategories() {
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    }
  })
  
  return categories.map(category => ({
    ...category,
    count: category._count.articles
  }))
}

export async function getArticlesByCategory(categorySlug: string) {
  const articles = await db.article.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })
  return articles
}

export async function getFeaturedArticles() {
  const articles = await db.article.findMany({
    where: {
      featured: true,
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })
  return articles
}

export async function getArticleBySlug(slug: string) {
  const article = await db.article.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })
  return article
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

export function formatDate(date: string) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr })
}

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: {
    id: string
    name: string
    slug: string
  }
  publishedAt: Date
  readTime: string
  category: {
    id: string
    name: string
    slug: string
  }
  tags: {
    id: string
    name: string
  }[]
  featured: boolean
  views: number
  citations: number
}

export interface Author {
  id: string
  name: string
  slug: string
  title: string
  affiliation: string
  bio: string
  expertise: string[]
  email: string
  twitter: string | null
  linkedin: string | null
  orcid: string | null
  researchgate: string | null
  articlesCount: number
  citations: number
  hIndex: number
  avatar: string
  education: {
    id: string
    degree: string
    institution: string
    year: string
  }[]
}

export async function getArticlesByAuthor(authorSlug: string) {
  const articles = await db.article.findMany({
    where: {
      author: {
        slug: authorSlug,
      },
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })
  return articles
}

export async function getAllAuthors() {
  const authors = await db.author.findMany({
    include: {
      articles: {
        select: {
          id: true,
        },
      },
    },
  })
  return authors.map(author => ({
    ...author,
    articlesCount: author.articles.length
  }))
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const author = await db.author.findUnique({
    where: {
      slug,
    },
    include: {
      education: true,
    },
  })
  return author as unknown as Author | null
}

export async function getRelatedArticles(currentArticleSlug: string, limit = 2): Promise<Article[]> {
  const currentArticle = await getArticleBySlug(currentArticleSlug)
  if (!currentArticle) return []

  const articles = await db.article.findMany({
    where: {
      AND: [
        { slug: { not: currentArticleSlug } },
        {
          OR: [
            { category: { slug: currentArticle.category.slug } },
            { tags: { some: { name: { in: currentArticle.tags.map(t => t.name) } } } },
          ],
        },
      ],
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
    take: limit,
  })
  return articles as unknown as Article[]
}

export async function getAdjacentArticles(currentArticleSlug: string): Promise<{
  previous: Article | null
  next: Article | null
}> {
  const articles = await getAllArticles()
  const currentIndex = articles.findIndex(article => article.slug === currentArticleSlug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  }
}
