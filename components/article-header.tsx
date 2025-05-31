import { Article, formatDate } from "@/lib/data";

import { ArrowLeft, Bookmark, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function ArticleHeader({ article }: { article: Article }) {
  return (
<> 
<div className="flex items-center justify-between mb-8">
<Link href="/articles">
  <Button variant="ghost" size="sm">
	<ArrowLeft className="mr-2 h-4 w-4" />
	Retour aux articles
  </Button>
</Link>
<div className="flex items-center gap-2">
  <Button variant="outline" size="sm">
	<Share2 className="mr-2 h-4 w-4" />
	Partager
  </Button>
  <Button variant="outline" size="sm">
	<Bookmark className="mr-2 h-4 w-4" />
	Sauvegarder
  </Button>
</div>
</div>

{/* Article Div */}
<div className="mb-8">
<Badge className="mb-4">{article?.category.name}</Badge>
<h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{article?.title}</h1>
<div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
  <Link href={`/authors/${article?.author.slug}`}>{article?.author.name}</Link>
  <span>•</span>
  <span>{article && formatDate(article.publishedAt)}</span>
  <span>•</span>
  <span className="flex items-center gap-1">
	<Clock className="h-4 w-4" />
	{article?.readTime} de lecture
  </span>
</div>
<p className="text-xl leading-relaxed text-muted-foreground">
  {article?.description}
</p>
</div>
</>	
  )
}
