import { Users, Target, Award, Globe } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"

export const metadata = {
  title: "About Us",
  description: "Learn more about our team and values.",
};

const teamMembers = [
  {
    name: "Prof. Catherine Dubois",
    slug: "catherine-dubois",
    role: "Rédactrice en chef",
    bio: "Spécialiste en biologie moléculaire avec 20 ans d'expérience dans l'édition scientifique.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Michel Laurent",
    slug: "michel-laurent",
    role: "Directeur scientifique",
    bio: "Physicien théoricien et expert en évaluation par les pairs.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Sarah Chen",
    slug: "sarah-chen",
    role: "Responsable éditoriale",
    bio: "Docteure en informatique, spécialisée dans la science des données.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const values = [
  {
    icon: Target,
    title: "Excellence scientifique",
    description:
      "Nous nous engageons à publier uniquement des recherches de la plus haute qualité, rigoureusement évaluées par des experts.",
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description:
      "Nous croyons que la science doit être accessible à tous, avec des articles clairs et des visualisations interactives.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Nous favorisons la collaboration interdisciplinaire et les échanges entre chercheurs du monde entier.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Nous adoptons les dernières technologies pour améliorer l'expérience de lecture et de recherche.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container lg:min-w-5xl mx-auto py-10 px-4 md:px-6 max-w-8xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">À propos de la SDEAM</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Depuis 2010, nous publions des recherches de pointe dans tous les domaines scientifiques, en mettant
            l&apos;accent sur la qualité, l&apos;innovation et l&apos;accessibilité.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Le Journal Scientifique a pour mission de promouvoir l&apos;excellence en recherche scientifique en fournissant
              une plateforme de publication rigoureuse et accessible. Nous nous engageons à soutenir la communauté
              scientifique mondiale en facilitant la diffusion des connaissances et en encourageant l&apos;innovation.
            </p>
            <p className="text-lg leading-relaxed">
              Notre approche unique combine l&apos;évaluation par les pairs traditionnelle avec des technologies modernes de
              visualisation de données, permettant aux lecteurs de mieux comprendre et d&apos;interagir avec les résultats de
              recherche.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Nos valeurs</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <value.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">En chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">1,247</div>
                <p className="text-sm text-muted-foreground">Articles publiés</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">89</div>
                <p className="text-sm text-muted-foreground">Chercheurs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">12,456</div>
                <p className="text-sm text-muted-foreground">Citations</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">45</div>
                <p className="text-sm text-muted-foreground">Pays</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre équipe éditoriale</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${member.slug}`} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre processus de publication</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                  Soumission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les chercheurs soumettent leurs manuscrits via notre plateforme en ligne. Chaque soumission est
                  immédiatement vérifiée pour s&apos;assurer qu&apos;elle respecte nos standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                  Évaluation par les pairs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chaque article est évalué par au moins deux experts indépendants dans le domaine concerné. Ce
                  processus garantit la qualité et la rigueur scientifique.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                  Révision et amélioration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les auteurs révisent leurs articles en fonction des commentaires des évaluateurs. Notre équipe
                  éditoriale accompagne ce processus d&apos;amélioration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center">4</Badge>
                  Publication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Une fois acceptés, les articles sont publiés avec des visualisations interactives et des outils
                  d&apos;analyse pour maximiser leur impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Nous contacter</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p className="text-muted-foreground">
                    Journal Scientifique
                    <br />
                    123 Avenue de la Recherche
                    <br />
                    75005 Paris, France
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-muted-foreground">
                    Email: contact@journal-scientifique.fr
                    <br />
                    Téléphone: +33 1 23 45 67 89
                    <br />
                    Fax: +33 1 23 45 67 90
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
