import { ReactNode } from 'react'

export interface Author {
  name: string
  slug: string
}

export interface Article {
  id: string
  slug: string
  title: string
  description: string
  content: ReactNode
  publishedAt: string
  readTime: string
  author: Author
  tags: string[]
} 
