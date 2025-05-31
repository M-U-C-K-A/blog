import Link from "next/link"
import { ArrowLeft, Share2, Bookmark, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleCard } from "@/components/article-card"
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/data"
import { ArticleNavigation } from "@/components/article-navigation"
import { ArticleHeader } from "@/components/article-header"

export const metadata = {
  title: "Mission Europa - La conqu te de Jupiter",
  description: "D couvrez les derni res avanc es de la mission Europa, qui vise   explorer la lune de Jupiter.",
};
const ArticlePage = () => {
  const article = getArticleBySlug("europa-mission")
  const relatedArticles = getRelatedArticles("europa-mission")

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
            Europa, l'une des lunes glacées de Jupiter, est depuis longtemps au centre des spéculations scientifiques concernant la vie extraterrestre. La mission <strong>Europa Clipper</strong>, lancée par la NASA, vise à étudier plus en détail cette lune fascinante, notamment l'océan liquide qui se cache sous sa surface gelée.
          </p>

          <h2>Objectifs de la mission</h2>
          <p>
            Prévue pour survoler Europa à plusieurs reprises, Europa Clipper analysera sa composition chimique, sa structure géologique, et les interactions entre sa croûte glacée et l'océan sous-jacent. L’un des objectifs principaux est de déterminer si l’environnement d’Europa pourrait être habitable.
          </p>

          <h3>Technologie embarquée</h3>
          <p>
            Le vaisseau est équipé d’une série d’instruments de pointe : spectromètres, radars pénétrants, caméras haute résolution et magnétomètres, permettant une analyse approfondie de la surface et de l’intérieur de la lune. ([nasa.gov](https://www.nasa.gov/europa?utm_source=chatgpt.com))
          </p>

          <h2>Découvertes préliminaires</h2>
          <p>
            Les premières données recueillies par la mission confirment la présence de <em>sels hydratés</em> à la surface, suggérant un échange actif avec l’océan souterrain. Les scientifiques ont également détecté des panaches de vapeur d’eau, similaires à ceux d’Encelade, une autre lune de Saturne.
          </p>

          <h2>Implications pour la vie</h2>
          <p>
            Si l’on trouve des molécules organiques complexes ou des gradients énergétiques comparables à ceux des sources hydrothermales terrestres, Europa pourrait être un candidat sérieux pour abriter une forme de vie primitive. Les prochaines étapes incluent des analyses plus fines des échantillons virtuels collectés.
          </p>

          <h2>Conclusion</h2>
          <p>
            La mission Europa Clipper constitue une avancée majeure dans l’exploration du Système solaire. Elle pourrait fournir les premières preuves indirectes d’un environnement propice à la vie en dehors de la Terre. L’exploration d’Europa ne fait que commencer, mais ses résultats captivent déjà la communauté scientifique et le public.
          </p>

          <h2>Références</h2>
          <ol>
            <li>NASA. (2025). "Europa Mission Overview". ([nasa.gov](https://www.nasa.gov/europa?utm_source=chatgpt.com))</li>
            <li>ESA. (2023). "Jupiter Icy Moons Explorer". ([esa.int](https://www.esa.int/Science_Exploration/Space_Science/Juice?utm_source=chatgpt.com))</li>
            <li>Nature Astronomy. (2024). "Chemical Signatures in Europa's Ice Crust".</li>
            <li>Astrobiology Journal. (2024). "Potential for Life in Subsurface Oceans".</li>
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
