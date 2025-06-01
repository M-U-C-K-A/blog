'use server'

import { db } from '@/lib/db'

export async function getArticlesAction() {
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

export async function getCategoriesAction() {
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
