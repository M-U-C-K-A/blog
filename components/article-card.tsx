import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ArticleCardProps {
  title: string
  description: string
  author: string
  author_slug: string
  date: string
  category: string
  slug: string
  readTime?: string
}

export function ArticleCard({ title, description, author, author_slug, date, category, slug, readTime }: ArticleCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{category}</Badge>
          {readTime && <span className="text-sm text-muted-foreground">{readTime}</span>}
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-sm">
			<Link href={`/authors/${author_slug}`} className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {author}
			</Link>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/articles/${slug}`} className="w-full">
          <Button className="w-full">
            Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
