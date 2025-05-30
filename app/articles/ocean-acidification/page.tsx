"use client"

import Link from "next/link"
import { ArrowLeft, Share2, Bookmark, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleCard } from "@/components/article-card"
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/data"
import { ArticleNavigation } from "@/components/article-navigation"

const ArticlePage = () => {
	const article = getArticleBySlug("ocean-acidification")
	const relatedArticles = getRelatedArticles("ocean-acidification")

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<ReadingProgress />

			<div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
				{/* Navigation */}
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

				{/* Article Header */}
				<header className="mb-8">
					<Badge className="mb-4">{article?.category.name}</Badge>
					<h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{article?.title}</h1>
					<div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
						<span>{article?.author.name}</span>
						<span>•</span>
						<span>{article && formatDate(article.publishedAt)}</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							{article?.readTime} de lecture
						</span>
					</div>
					<p className="text-xl leading-relaxed text-muted-foreground">
						Une analyse approfondie des effets de l'acidification sur la chaîne alimentaire marine et les stratégies d'adaptation des organismes marins.
					</p>
				</header>

				<Separator className="mb-8" />

				{/* Article Content */}
				<article className="prose prose-slate dark:prose-invert max-w-none">
					<h2>Introduction</h2>
					<p>
						L'acidification des océans, souvent qualifiée de "l'autre problème du CO₂", résulte de l'absorption par les mers d'une part croissante du dioxyde de carbone atmosphérique. Ce phénomène chimique entraîne une baisse du pH de l'eau de mer, modifiant profondément la chimie océanique et menaçant l'équilibre des écosystèmes marins.
					</p>

					<h2>Impacts sur les organismes marins</h2>
					<p>
						De nombreux organismes marins, notamment les coraux, les mollusques et certains planctons,
						dépendent du carbonate de calcium pour construire leurs structures. L'acidification réduit la disponibilité des ions carbonate, rendant la calcification plus difficile et entraînant la dissolution des structures existantes.
						Les larves de certains poissons et invertébrés présentent également une sensibilité accrue, affectant leur développement et leur survie.
					</p>

					<h3>Effets sur la chaîne alimentaire</h3>
					<p>
						Les perturbations subies par les organismes calcifiants ont des répercussions en cascade sur la chaîne alimentaire marine. Par exemple, les ptéropodes, petits mollusques à coquille, constituent une source de nourriture essentielle pour de nombreux poissons et mammifères marins. Leur déclin pourrait donc affecter l'ensemble de l'écosystème. :contentReference
					</p>

					<h2>Stratégies d'adaptation des organismes</h2>
					<p>
						Certains organismes marins montrent des capacités d'adaptation face à l'acidification. Des études ont révélé que certaines espèces de polychètes vivant près de sources naturelles de CO₂ présentent une tolérance accrue à des conditions acides. :contentReference De plus, la réduction des autres pressions environnementales, comme la pollution et la surpêche, peut renforcer la résilience des écosystèmes face à l'acidification. :contentReference
					</p>

					<h2>Conclusion</h2>
					<p>
						L'acidification des océans représente une menace majeure pour la biodiversité marine et les services écosystémiques associés. Une action concertée, incluant la réduction des émissions de CO₂ et la protection des habitats marins, est essentielle pour atténuer ses effets et préserver la santé des océans pour les générations futures.
					</p>

					<h2>Références</h2>
					<ol>
						<li>
							EPA. (2025). "Effects of Ocean and Coastal Acidification on Marine Life".
						</li>
						<li>
							NOAA Fisheries. (2025). "Understanding Ocean Acidification".
						</li>
						<li>
							Cigliano, M. et al. (2013). "Adaptation and acclimatization to ocean acidification in marine polychaetes".
						</li>
						<li>
							WCEL. (2021). "Climate and the ocean: How to combat ocean acidification".
						</li>
					</ol>
				</article>

				<Separator className="my-12" />

				{/* Article Navigation */}
					  {article && <ArticleNavigation currentSlug={article.id} /> }

				{/* Related Articles */}
				<section>
					<h2 className="text-2xl font-bold mb-6">Articles recommandés</h2>
					<div className="grid gap-6 md:grid-cols-2">
						{relatedArticles.map((article) => (
							<ArticleCard
								key={article.id}
								title={article.title}
								description={article.description}
								author={article.author.name}
								author_slug={article.author.slug}
								date={formatDate(article.publishedAt)}
								category={article.category.name}
								slug={article.slug}
								readTime={article.readTime}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}

export default ArticlePage
