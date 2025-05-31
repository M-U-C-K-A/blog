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
import { ArticleHeader } from "@/components/article-header"

const ArticlePage = () => {
	const article = getArticleBySlug("ocean-acidification")
	const relatedArticles = getRelatedArticles("ocean-acidification")

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<ReadingProgress />

			<div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
				{/* Navigation */}
				{article && <ArticleHeader article={article} />}

				<Separator className="mb-8" />

				{/* Article Content */}
				<article className="prose prose-slate dark:prose-invert max-w-none">
					<h2>Introduction</h2>
					<p>
						L'acidification des océans, souvent qualifiée de "l'autre problème du CO₂", résulte de l'absorption par les mers d'une part croissante du dioxyde de carbone atmosphérique. Depuis le début de l'ère industrielle, les océans ont absorbé près de 30 % des émissions de CO₂, provoquant une baisse du pH de l’eau de mer de 8,2 à environ 8,1 aujourd’hui. Ce changement apparemment minime a en réalité de profondes conséquences pour la chimie océanique, perturbant l'équilibre des ions et menaçant la biodiversité marine.
					</p>

					<h2>Impacts sur les organismes marins</h2>
					<p>
						De nombreux organismes marins, notamment les coraux, les mollusques (comme les huîtres et les moules) et certains types de plancton, dépendent du carbonate de calcium pour construire leurs structures rigides : coquilles, squelettes, récifs. L'acidification réduit la concentration en ions carbonate nécessaires à cette calcification. Résultat : non seulement la croissance de ces organismes est ralentie, mais leurs structures existantes peuvent aussi commencer à se dissoudre dans les eaux plus acides.
					</p>
					<p>
						Les larves de nombreux poissons et invertébrés marins, très sensibles aux variations de pH, voient leur développement affecté. Certaines études ont montré des anomalies de comportement et une mortalité accrue chez les larves de poissons exposées à des conditions acides, compromettant leur capacité à se nourrir, se défendre ou s’orienter.
					</p>

					<h3>Effets sur la chaîne alimentaire</h3>
					<p>
						Les perturbations subies par les organismes calcifiants ont des répercussions en cascade sur la chaîne alimentaire marine. Par exemple, les ptéropodes, de petits mollusques planctoniques à coquille, constituent une source de nourriture essentielle pour de nombreux poissons, comme le saumon, ainsi que pour certains mammifères marins. Leur déclin pourrait affecter l’ensemble de l’écosystème, en réduisant la disponibilité en nourriture pour les espèces supérieures, et en déséquilibrant les interactions trophiques.
					</p>
					<p>
						En outre, la diminution de la biodiversité planctonique pourrait altérer les processus biogéochimiques comme le cycle du carbone et de l’azote, entraînant une réduction de la productivité primaire dans certaines régions océaniques.
					</p>

					<h2>Stratégies d'adaptation des organismes</h2>
					<p>
						Malgré ces menaces, certains organismes marins font preuve de capacités d'adaptation. Par exemple, certaines espèces de polychètes vivant près de sources naturelles de CO₂ (comme les évents volcaniques sous-marins) ont montré une tolérance accrue à des niveaux de pH plus bas, suggérant une possible acclimatation génétique ou physiologique. Ces milieux extrêmes sont devenus des laboratoires naturels pour étudier la résilience des espèces face à l'acidification.
					</p>
					<p>
						Par ailleurs, la réduction des autres pressions anthropiques, telles que la pollution chimique, la surpêche ou la destruction des habitats (mangroves, récifs coralliens), peut renforcer la capacité des écosystèmes à faire face à l’acidification. Des zones marines protégées bien gérées, par exemple, peuvent servir de refuges pour les espèces vulnérables et favoriser leur rétablissement.
					</p>

					<h2>Conclusion</h2>
					<p>
						L'acidification des océans représente une menace insidieuse mais bien réelle pour la biodiversité marine et les services écosystémiques associés, comme la pêche, la régulation climatique ou la protection des côtes. Pour enrayer ce processus, il est crucial de réduire rapidement les émissions globales de CO₂. Cette action doit être accompagnée de politiques de conservation ambitieuses visant à protéger les habitats marins, renforcer la résilience écologique et encourager la recherche scientifique pour mieux anticiper les effets futurs de ce phénomène mondial.
					</p>

					<h2>Références</h2>
					<ol>
						<li>
							EPA. (2025). <em>"Effects of Ocean and Coastal Acidification on Marine Life"</em>.
						</li>
						<li>
							NOAA Fisheries. (2025). <em>"Understanding Ocean Acidification"</em>.
						</li>
						<li>
							Cigliano, M. et al. (2013). <em>"Adaptation and acclimatization to ocean acidification in marine polychaetes"</em>.
						</li>
						<li>
							WCEL. (2021). <em>"Climate and the ocean: How to combat ocean acidification"</em>.
						</li>
					</ol>
				</article>

				<Separator className="my-12" />

				{/* Article Navigation */}
				{article && <ArticleNavigation currentSlug={article.id} />}

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
