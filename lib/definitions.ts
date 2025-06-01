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
  publishedAt: string | Date
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

export interface Category {
  id: string
  name: string
  slug: string
  count: number
} 
