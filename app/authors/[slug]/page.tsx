import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Twitter, Linkedin, BookOpen, Award } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { ArticleCard } from "@/components/article-card"
import { getAuthorBySlug, getArticlesByAuthor, getInitials } from "@/lib/data"

interface Props {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    return {
      title: "Auteur non trouvé",
      description: "L'auteur que vous recherchez n'existe pas."
    }
  }

  const faviconUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${author.slug}`

  return {
    title: `${author.name} | Climate Impact News`,
    description: author.bio,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${author.name} | Climate Impact News`,
      description: author.bio,
      type: 'profile',
      profile: {
        firstName: author.name.split(' ')[0],
        lastName: author.name.split(' ').slice(1).join(' '),
        username: author.slug,
      },
      images: [
        {
          url: faviconUrl,
          width: 64,
          height: 64,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} | Climate Impact News`,
      description: author.bio,
      images: [faviconUrl],
    },
  }
}

export default async function AuthorPage({ params }: Props) {
  const author = await getAuthorBySlug(params.slug)
  const articles = await getArticlesByAuthor(params.slug)

  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Le reste de votre code reste inchangé */}
      <Header />

      <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/articles">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Button>
          </Link>
        </div>

        {/* Author Header */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={`/avatars/${author.slug}.svg`}
                  alt={author.name}
                />
                <AvatarFallback className="text-2xl">{getInitials(author.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-2">{author.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{author.title}</p>
                <p className="text-lg text-muted-foreground mb-4">{author.affiliation}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {author.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  {author.twitter && (
                    <Button variant="outline" size="sm">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                  )}
                  {author.linkedin && (
                    <Button variant="outline" size="sm">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Articles publiés</span>
                <span className="font-semibold">{author.articlesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Citations</span>
                <span className="font-semibold">{author.citations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">H-Index</span>
                <span className="font-semibold">{author.hIndex}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biography */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Biographie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{author.bio}</p>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {author.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold">{edu.degree}</h2>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                  <Badge variant="outline">{edu.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Articles */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Articles publiés ({articles.length})</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
