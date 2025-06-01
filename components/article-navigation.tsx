// components/article-navigation.tsx
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Article } from "@/lib/types"

interface ArticleNavigationProps {
  currentSlug: string
  previous: Article | null
  next: Article | null
}

export const ArticleNavigation = ({ currentSlug, previous, next }: ArticleNavigationProps) => {
  return (
    <div className="flex justify-between items-center my-6 gap-4">
      {previous && (
        <Link
          href={`/articles/${previous.slug}`}
          className="flex-1 group border p-4 rounded-md hover:bg-muted/40 flex items-start gap-2 min-h-[100px]"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-primary" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Article précédent</p>
            <p className="text-lg font-medium group-hover:text-primary">
              {previous.title}
            </p>
          </div>
        </Link>
      )}

      {next && (
        <Link
          href={`/articles/${next.slug}`}
          className={`flex-1 group border p-4 rounded-md hover:bg-muted/40 flex items-end gap-2 min-h-[100px] ${!previous ? 'ml-auto' : 'ml-auto text-right'}`}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">Article suivant</p>
            <p className="text-lg font-medium group-hover:text-primary">
              {next.title}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-primary" />
        </Link>
      )}
    </div>
  )
}
