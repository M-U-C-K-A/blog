// app/authors/page.tsx
import { getAllAuthors } from "@/lib/data"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nos Auteurs",
  description: "Découvrez les auteurs de Climate Impact News",
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Nos Auteurs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatars/${author.slug}.svg`} alt={author.name} />
                  <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{author.name}</h2>
                  <p className="text-gray-600">{author.title}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{author.affiliation}</p>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">{author.articlesCount} articles</span>
                <span className="mr-4">{author.citations} citations</span>
                <span>h-index: {author.hIndex}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
