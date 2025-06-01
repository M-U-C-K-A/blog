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
