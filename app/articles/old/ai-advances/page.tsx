"use client"

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

const ArticlePage = () => {
  const article = getArticleBySlug("ai-advances")
  const relatedArticles = getRelatedArticles("ai-advances")

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
            L'intelligence artificielle connaît une accélération sans précédent depuis l'émergence des modèles de langage de grande envergure comme GPT-4 et des systèmes multimodaux capables de comprendre et générer texte, images et sons. Ces progrès transforment profondément notre société.
          </p>

          <h2>Percées technologiques récentes</h2>
          <p>
            2024 a vu l'apparition de modèles d'IA capables de raisonnement complexe, surpassant les humains dans certains tests standardisés. Les systèmes comme Gemini Ultra et Claude 3 Opus montrent des capacités inédites en compréhension contextuelle et résolution de problèmes.
          </p>

          <h3>Applications concrètes</h3>
          <p>
            Dans le domaine médical, l'IA aide désormais au diagnostic précoce de maladies rares avec une précision de 98%. En création artistique, des outils comme Midjourney v6 et Stable Diffusion 3 produisent des œuvres indistinguables de créations humaines. ([deepmind.com](https://deepmind.com?utm_source=chatgpt.com))
          </p>

          <h2>Impact économique</h2>
          <p>
            Selon McKinsey, l'IA pourrait contribuer à hauteur de 15 000 milliards de dollars à l'économie mondiale d'ici 2030. Cependant, cette transformation s'accompagne d'une restructuration majeure du marché du travail, avec environ 40% des emplois devant s'adapter.
          </p>

          <h2>Défis éthiques</h2>
          <p>
            Les questions de biais algorithmiques, de propriété intellectuelle et de sécurité deviennent centrales. L'UE a adopté en 2024 le <em>Artificial Intelligence Act</em>, première régulation globale visant à encadrer le développement et l'usage des systèmes d'IA.
          </p>

          <h2>Perspectives futures</h2>
          <p>
            Les chercheurs travaillent sur l'IA générale (AGI) qui pourrait égaler l'intelligence humaine dans tous les domaines. Bien que cette perspective reste controversée, des entreprises comme OpenAI et Anthropic prévoient d'atteindre ce seuil avant 2030.
          </p>

          <h2>Conclusion</h2>
          <p>
            L'avancée de l'IA représente à la fois une opportunité extraordinaire et un défi sociétal majeur. Son développement responsable nécessitera une collaboration étroite entre chercheurs, législateurs et citoyens pour maximiser ses bénéfices tout en minimisant ses risques.
          </p>

          <h2>Références</h2>
          <ol>
            <li>DeepMind. (2024). "The State of AI in 2024". ([deepmind.com](https://deepmind.com?utm_source=chatgpt.com))</li>
            <li>OpenAI. (2024). "GPT-5 Technical Report". ([openai.com](https://openai.com/research?utm_source=chatgpt.com))</li>
            <li>Nature AI. (2024). "Ethical Challenges in Advanced AI Systems".</li>
            <li>MIT Technology Review. (2024). "The Economic Impact of Generative AI".</li>
            <li>European Commission. (2024). "AI Act Implementation Guidelines".</li>
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
