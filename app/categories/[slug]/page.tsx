import { getArticlesByCategory, formatDate } from "@/lib/data"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/data"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const articles = await getArticlesByCategory(params.slug)
  
  if (!articles.length) {
    return {
      title: "Catégorie non trouvée | Climate Impact News",
      description: "La catégorie que vous recherchez n'existe pas."
    }
  }

  const categoryName = articles[0].category.name
  return {
    title: `${categoryName} | Climate Impact News`,
    description: `Découvrez nos articles sur ${categoryName}`,
    openGraph: {
      title: `${categoryName} | Climate Impact News`,
      description: `Découvrez nos articles sur ${categoryName}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const articles = await getArticlesByCategory(params.slug)
  
  if (!articles.length) {
    notFound()
  }

  const categoryName = articles[0].category.name

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link 
            href="/categories" 
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 block"
          >
            ← Retour aux catégories
          </Link>
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-xl text-gray-600">
            {articles.length} article{articles.length > 1 ? "s" : ""} dans cette catégorie
          </p>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/avatars/${article.author.slug}.svg`} alt={article.author.name} />
                      <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-sm text-gray-500">{formatDate(article.publishedAt.toISOString())}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="mr-4">{article.readTime}</span>
                    <span className="mr-4">{article.views} vues</span>
                    <span>{article.citations} citations</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
