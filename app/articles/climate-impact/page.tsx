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
import { Chart } from "./chart"
import { BarChartComponent } from "./bar-chart"
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/data"
import { ArticleNavigation } from "@/components/article-navigation"

const ArticlePage = () => {
  const article = getArticleBySlug("climate-impact")
  const relatedArticles = getRelatedArticles("climate-impact")

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
            Cette étude examine les effets du réchauffement des océans sur les écosystèmes marins et présente des
            données recueillies sur une période de dix ans dans différentes régions océaniques.
          </p>
        </header>

        <Separator className="mb-8" />

        {/* Article Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            Le changement climatique représente l'une des plus grandes menaces pour les écosystèmes marins mondiaux.
            L'augmentation des températures océaniques, l'acidification et la désoxygénation modifient profondément les
            habitats marins et affectent la distribution et l'abondance des espèces.
          </p>
          <p>
            Notre étude s'est concentrée sur l'analyse des données recueillies dans cinq zones océaniques distinctes
            entre 2015 et 2025, en mesurant plusieurs paramètres clés:
          </p>
          <ul>
            <li>Température moyenne de surface</li>
            <li>pH de l'eau</li>
            <li>Niveaux d'oxygène dissous</li>
            <li>Biodiversité (nombre d'espèces observées)</li>
            <li>Biomasse totale</li>
          </ul>

          <h2>Méthodologie</h2>
          <p>
            Les données ont été collectées à l'aide de bouées océanographiques équipées de capteurs avancés, complétées
            par des prélèvements et observations in situ réalisés trimestriellement. L'analyse statistique a été
            effectuée en utilisant des modèles de régression multiple et des analyses de séries temporelles.
          </p>

          <h2>Résultats</h2>
          <p>
            Nos résultats montrent une corrélation significative entre l'augmentation de la température et la diminution
            de la biodiversité dans toutes les zones étudiées.
          </p>

          <h3>Données de température et biodiversité</h3>

          <Tabs defaultValue="table" className="my-8">
            <TabsList>
              <TabsTrigger value="table">Tableau</TabsTrigger>
              <TabsTrigger value="line-chart">Graphique linéaire</TabsTrigger>
              <TabsTrigger value="bar-chart">Graphique à barres</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle>Température et biodiversité par zone (2015-2025)</CardTitle>
                  <CardDescription>
                    Évolution de la température moyenne et du nombre d'espèces observées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Données collectées entre 2015 et 2025 dans cinq zones océaniques</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Zone</TableHead>
                        <TableHead>Temp. 2015 (°C)</TableHead>
                        <TableHead>Temp. 2025 (°C)</TableHead>
                        <TableHead>Variation</TableHead>
                        <TableHead>Espèces 2015</TableHead>
                        <TableHead>Espèces 2025</TableHead>
                        <TableHead>Variation (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Atlantique Nord</TableCell>
                        <TableCell>15.2</TableCell>
                        <TableCell>16.8</TableCell>
                        <TableCell>+1.6</TableCell>
                        <TableCell>342</TableCell>
                        <TableCell>298</TableCell>
                        <TableCell className="text-red-500">-12.9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Méditerranée</TableCell>
                        <TableCell>19.8</TableCell>
                        <TableCell>22.1</TableCell>
                        <TableCell>+2.3</TableCell>
                        <TableCell>315</TableCell>
                        <TableCell>256</TableCell>
                        <TableCell className="text-red-500">-18.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mer des Caraïbes</TableCell>
                        <TableCell>27.1</TableCell>
                        <TableCell>29.4</TableCell>
                        <TableCell>+2.3</TableCell>
                        <TableCell>487</TableCell>
                        <TableCell>392</TableCell>
                        <TableCell className="text-red-500">-19.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pacifique Sud</TableCell>
                        <TableCell>24.3</TableCell>
                        <TableCell>26.1</TableCell>
                        <TableCell>+1.8</TableCell>
                        <TableCell>523</TableCell>
                        <TableCell>458</TableCell>
                        <TableCell className="text-red-500">-12.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Océan Indien</TableCell>
                        <TableCell>26.7</TableCell>
                        <TableCell>28.9</TableCell>
                        <TableCell>+2.2</TableCell>
                        <TableCell>498</TableCell>
                        <TableCell>412</TableCell>
                        <TableCell className="text-red-500">-17.3%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Source: Données collectées par l'équipe de recherche, 2015-2025
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="line-chart">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution de la température et de la biodiversité (2015-2025)</CardTitle>
                  <CardDescription>Tendances observées dans les cinq zones océaniques étudiées</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Chart />
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Source: Données collectées par l'équipe de recherche, 2015-2025
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="bar-chart">
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison de la biodiversité par zone (2015 vs 2025)</CardTitle>
                  <CardDescription>Nombre d'espèces observées au début et à la fin de l'étude</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <BarChartComponent />
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Source: Données collectées par l'équipe de recherche, 2015-2025
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <h3>Acidification des océans</h3>
          <p>
            Parallèlement à l'augmentation des températures, nous avons observé une diminution constante du pH dans
            toutes les zones étudiées, avec une moyenne de -0.12 unités sur la période de dix ans. Cette acidification a
            des conséquences particulièrement graves sur les organismes calcifiants comme les coraux, les mollusques et
            certains planctons.
          </p>

          <h2>Discussion</h2>
          <p>
            La corrélation entre l'augmentation de la température et la diminution de la biodiversité est
            particulièrement préoccupante dans les zones tropicales, où de nombreuses espèces vivent déjà proche de leur
            limite thermique supérieure. Les récifs coralliens, qui abritent environ 25% de toutes les espèces marines,
            sont particulièrement vulnérables.
          </p>
          <p>
            Nos modèles prédictifs suggèrent que si les tendances actuelles se poursuivent, nous pourrions assister à
            une perte de 30 à 40% de la biodiversité marine dans certaines zones d'ici 2050, avec des conséquences
            catastrophiques pour les écosystèmes et les services qu'ils fournissent.
          </p>

          <h2>Conclusion</h2>
          <p>
            Cette étude souligne l'urgence de mettre en œuvre des mesures d'atténuation du changement climatique et de
            protection des écosystèmes marins. Les aires marines protégées, la réduction des émissions de gaz à effet de
            serre et la gestion durable des ressources marines sont essentielles pour préserver la biodiversité
            océanique pour les générations futures.
          </p>

          <h2>Références</h2>
          <ol>
            <li>
              Laurent, M. et al. (2023). "Impacts of ocean warming on marine biodiversity: a global assessment". Nature
              Climate Change, 15(3), 245-258.
            </li>
            <li>
              Dubois, T. & Martin, S. (2024). "Long-term monitoring of coral reef ecosystems under climate change".
              Science Advances, 10(8), eabc1234.
            </li>
            <li>IPCC (2023). "Special Report on the Ocean and Cryosphere in a Changing Climate".</li>
            <li>
              Smith, J. & Johnson, P. (2022). "Marine biodiversity loss: economic and ecological consequences".
              Ecological Economics, 185, 107062.
            </li>
            <li>
              Garcia, R. et al. (2024). "Adaptation strategies for marine ecosystems under climate change". Conservation
              Biology, 38(2), 412-425.
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
