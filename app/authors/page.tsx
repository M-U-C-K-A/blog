// app/authors/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getAllAuthors, Author } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAuthorBySlug, getArticlesByAuthor, formatDate, getInitials } from "@/lib/data"
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Auteurs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {authors.map((author) => (
          <div key={author.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/authors/${author.slug}`} passHref>
              <div className="cursor-pointer">
                <div className="relative h-48 w-full">
                  <Avatar className="w-full h-full rounded-none">
                <AvatarImage
				className="w-full h-full object-cover"
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${author.slug}`}
                  alt={author.name}
                />
              </Avatar>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
                  <p className="text-gray-600 mb-1">{author.title}</p>
                  <p className="text-gray-700 mb-3">{author.affiliation}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {author.expertise.map((topic) => (
						<Badge key={topic} variant="secondary">{topic}</Badge>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Articles: {author.stats.articles}</span>
                    <span>Citations: {author.stats.citations}</span>
                    <span>h-index: {author.stats.hIndex}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
