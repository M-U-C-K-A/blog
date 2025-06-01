import random
import asyncio
import aiohttp
import aiofiles
import os
import unicodedata
from datetime import datetime
from prisma import Prisma
from faker import Faker
import slugify
from typing import Dict, List, Optional

# Initialisation Faker en français
fake = Faker('fr_FR')

# Configuration
CONFIG = {
    "reset_db": True,
    "nb_authors": 25,
    "nb_articles": 60,
    "min_words": 12000,
    "max_words": 35000,
    "avatars_dir": "public/avatars",
    "banners_dir": "public/banners"
}

# Données scientifiques
SCIENTIFIC_DOMAINS = [
    "Neurosciences", "Intelligence Artificielle", "Physique Quantique",
    "Biologie Moléculaire", "Climatologie", "Astrophysique", "Génétique",
    "Informatique", "Mathématiques", "Chimie", "Génie Biomédical",
    "Psychologie", "Écologie", "Science des Matériaux", "Économie"
]

ACADEMIC_TITLES = [
    "Professeur", "Professeur Associé", "Professeur Assistant",
    "Chercheur Principal", "Maître de Conférences", "Postdoctorant", "Doctorant"
]

UNIVERSITIES = [
    "Université Paris-Saclay", "Sorbonne Université", "Université PSL",
    "École Polytechnique", "Université de Genève", "ETH Zurich",
    "Université de Montréal", "Université McGill", "Université de Liège",
    "Université Libre de Bruxelles", "École Normale Supérieure",
    "Université de Strasbourg", "Université Claude Bernard Lyon 1",
    "Université Aix-Marseille", "Institut Pasteur"
]

DIPLOMES = [
    "Doctorat", "Doctorat en Médecine", "Doctorat ès Sciences",
    "Master", "Licence", "Ingénieur", "HDR"
]

ARTICLE_TYPES = [
    "Article de Recherche", "Revue de Littérature", "Communication Courte",
    "Étude de Cas", "Méthodologie", "Perspective", "Commentaire"
]

TAGS = [
    "apprentissage automatique", "apprentissage profond", "réseaux de neurones",
    "génomique", "protéomique", "informatique quantique", "nanotechnologie",
    "changement climatique", "biotechnologie", "immunologie",
    "sciences cognitives", "physique théorique", "mathématiques appliquées",
    "science des données", "robotique"
]

# Helper functions
def clean_string(text: str) -> str:
    """Normalise et supprime les accents"""
    return unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode('ASCII')

def create_slug(name: str) -> str:
    """Crée un slug sans accents"""
    return slugify.slugify(clean_string(name))

async def reset_database(db: Prisma):
    """Vide complètement la base de données"""
    print("Nettoyage de la base...")
    await db.component.delete_many()
    await db.article.delete_many()
    await db.education.delete_many()
    await db.author.delete_many()
    await db.tag.delete_many()
    await db.category.delete_many()

async def clear_media_files():
    """Supprime les avatars et bannières existants"""
    for folder in [CONFIG["avatars_dir"], CONFIG["banners_dir"]]:
        if os.path.exists(folder):
            for file in os.listdir(folder):
                try:
                    os.remove(os.path.join(folder, file))
                except Exception as e:
                    print(f"Erreur suppression {file}: {e}")

async def download_image(url: str, path: str):
    """Télécharge une image depuis une URL"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                async with aiofiles.open(path, 'wb') as f:
                    await f.write(await response.read())

# Génération des données
async def create_author(db: Prisma) -> Optional[Dict]:
    """Génère un auteur crédible"""
    first_name = fake.first_name()
    last_name = fake.last_name()
    full_name = f"{first_name} {last_name}"
    slug = create_slug(full_name)
    
    # Téléchargement des images
    avatar_url = f"https://api.dicebear.com/9.x/initials/svg?seed={slug}"
    banner_url = f"https://api.dicebear.com/9.x/glass/svg?seed={slug}"
    avatar_path = f"{CONFIG['avatars_dir']}/{slug}.svg"
    banner_path = f"{CONFIG['banners_dir']}/{slug}.svg"
    
    await asyncio.gather(
        download_image(avatar_url, avatar_path),
        download_image(banner_url, banner_path)
    )

    try:
        author = await db.author.create(
            data={
                "name": full_name,
                "slug": slug,
                "title": random.choice(ACADEMIC_TITLES),
                "affiliation": random.choice(UNIVERSITIES),
                "bio": fake.paragraph(nb_sentences=5),
                "expertise": {"set": random.sample(SCIENTIFIC_DOMAINS, k=3)},
                "email": f"{first_name.lower()}.{last_name.lower()}@univ.fr",
                "articlesCount": 0,
                "citations": random.randint(10, 5000),
                "hIndex": random.randint(1, 50),
                "avatar": f"/avatars/{slug}.svg"
            }
        )
        
        # Ajout des formations
        for _ in range(random.randint(1, 3)):
            await db.education.create(
                data={
                    "degree": random.choice(DIPLOMES),
                    "institution": random.choice(UNIVERSITIES),
                    "year": str(random.randint(1990, 2020)),
                    "authorId": author.id
                }
            )
            
        return author
    except Exception as e:
        print(f"Erreur création auteur: {e}")
        return None

def generate_citation() -> str:
    """Génère une citation bibliographique au format académique"""
    authors = ", ".join([fake.name() for _ in range(random.randint(1, 4))])
    year = random.randint(2020, 2025)
    title = fake.sentence(nb_words=8).rstrip(".")
    journal = random.choice([
        "Nature Climate Change",
        "Science Advances",
        "Environmental Research Letters",
        "Global Environmental Change",
        "Sustainability Science"
    ])
    volume = random.randint(1, 50)
    pages = f"{random.randint(1, 999)}-{random.randint(1000, 1999)}"
    doi = f"10.{random.randint(1000,9999)}/{fake.slug()}"
    
    return f'{authors} ({year}). "{title}". <em>{journal}</em>, {volume}, {pages}. DOI: <a href="https://doi.org/{doi}" class="text-primary hover:underline">{doi}</a>'

def generate_themed_paragraph(theme: str, nb_sentences: int = 10) -> str:
    """Génère un paragraphe structuré autour d'un thème scientifique"""
    intro = f"{theme} est un domaine de recherche dynamique qui connaît une croissance constante dans les milieux scientifiques."
    body = " ".join([fake.sentence() for _ in range(nb_sentences - 2)])
    conclusion = f"En résumé, {theme.lower()} représente aujourd'hui l'un des axes majeurs de l'innovation scientifique."
    return f"{intro} {body} {conclusion}"

def generate_html_content() -> str:
    """Génère un contenu HTML structuré riche en balises et styles typographiques"""
    theme = random.choice(SCIENTIFIC_DOMAINS)

    def themed_paragraph(style: Optional[str] = None, nb_sentences: int = 8) -> str:
        intro = f"{theme} est un domaine de recherche dynamique qui connaît une croissance constante dans les milieux scientifiques."
        body = " ".join([fake.sentence() for _ in range(nb_sentences - 2)])
        conclusion = f"En résumé, {theme.lower()} représente aujourd'hui l'un des axes majeurs de l'innovation scientifique."
        content = f"{intro} {body} {conclusion}"

        if style == "lead":
            return f'<p class="lead text-xl font-medium text-muted-foreground mb-6">{content}</p>'
        elif style == "large":
            return f'<p class="text-lg leading-relaxed mb-4">{content}</p>'
        elif style == "small":
            return f'<p class="text-sm text-muted-foreground mb-3">{content}</p>'
        elif style == "muted":
            return f'<p class="text-muted-foreground mb-4">{content}</p>'
        else:
            return f'<p class="mb-4 leading-relaxed">{content}</p>'

    def generate_citation() -> str:
        """Génère une citation bibliographique au format académique"""
        authors = ", ".join([fake.name() for _ in range(random.randint(1, 4))])
        year = random.randint(2020, 2025)
        title = fake.sentence(nb_words=8).rstrip(".")
        journal = random.choice([
            "Nature Climate Change",
            "Science Advances",
            "Environmental Research Letters",
            "Global Environmental Change",
            "Sustainability Science"
        ])
        volume = random.randint(1, 50)
        pages = f"{random.randint(1, 999)}-{random.randint(1000, 1999)}"
        doi = f"10.{random.randint(1000,9999)}/{fake.slug()}"
        
        return f'{authors} ({year}). "{title}". <em>{journal}</em>, {volume}, {pages}. DOI: <a href="https://doi.org/{doi}" class="text-primary hover:underline">{doi}</a>'

    table_html = """
    <div class="my-8 overflow-x-auto">
        <h3 class="text-xl font-semibold mb-4">Tableau Comparatif</h3>
        <table class="w-full border-collapse">
            <thead class="bg-muted">
                <tr>
                    <th class="border px-4 py-2 text-left">Critère</th>
                    <th class="border px-4 py-2 text-left">Option A</th>
                    <th class="border px-4 py-2 text-left">Option B</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border px-4 py-2">Efficacité</td>
                    <td class="border px-4 py-2 font-medium">87%</td>
                    <td class="border px-4 py-2 font-medium">79%</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2">Précision</td>
                    <td class="border px-4 py-2 font-medium">91%</td>
                    <td class="border px-4 py-2 font-medium">84%</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2">Coût</td>
                    <td class="border px-4 py-2">Modéré</td>
                    <td class="border px-4 py-2">Élevé</td>
                </tr>
            </tbody>
        </table>
    </div>
    """

    html_parts = [
        '<article class="prose prose-slate dark:prose-invert max-w-none">',
        
        '<header class="mb-8">',
        '<h2 class="text-2xl font-bold mb-4">Résumé</h2>',
        themed_paragraph("lead", 6),
        '</header>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Introduction</h2>',
        themed_paragraph("large", 8),
        '</section>',

        '<section>',
        '<h3 class="text-xl font-semibold mb-3">Contexte</h3>',
        themed_paragraph(),
        '</section>',

        '<section>',
        '<h4 class="text-lg font-medium mb-3">Historique</h4>',
        themed_paragraph("small", 5),
        '</section>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Méthodologie</h2>',
        themed_paragraph(),
        '<blockquote class="border-l-4 border-primary pl-4 italic my-6">Cette méthodologie repose sur une approche reproductible et rigoureuse des protocoles scientifiques.</blockquote>',
        '</section>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Résultats</h2>',
        themed_paragraph(),
        table_html,
        '</section>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Discussion</h2>',
        themed_paragraph(),
        '<ul class="list-disc pl-6 mb-6 space-y-2">' + 
        "".join(f'<li class="text-muted-foreground">{fake.sentence()}</li>' for _ in range(4)) + 
        '</ul>',
        '</section>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Conclusion</h2>',
        themed_paragraph("muted", 6),
        '</section>',

        '<section>',
        '<h2 class="text-2xl font-bold mb-4">Références</h2>',
        '<ol class="list-decimal pl-6 space-y-3">' + 
        "".join(f'<li class="text-muted-foreground">{generate_citation()}</li>' for _ in range(10)) + 
        '</ol>',
        '</section>',

        '</article>'
    ]

    return "\n".join(html_parts)

async def create_article(db: Prisma, author_id: str, category_id: str, tag_ids: List[str]) -> bool:
    """Crée un article scientifique complet"""
    title = fake.sentence(nb_words=8).replace('.', '')
    
    try:
        await db.article.create(
            data={
                "title": title,
                "slug": create_slug(title),
                "description": fake.paragraph(nb_sentences=2),
                "content": generate_html_content(),
                "publishedAt": fake.date_time_between(start_date='-3y'),
                "readTime": f"{random.randint(10, 45)} min",
                "views": random.randint(50, 10000),
                "featured": random.choice([True, False]),
                "citations": random.randint(0, 500),  # Random number of citations
                "authorId": author_id,
                "categoryId": category_id,
                "tags": {"connect": [{"id": id} for id in tag_ids]}
            }
        )
        return True
    except Exception as e:
        print(f"Erreur création article: {e}")
        return False

async def main():
    # Initialisation
    os.makedirs(CONFIG["avatars_dir"], exist_ok=True)
    os.makedirs(CONFIG["banners_dir"], exist_ok=True)
    
    db = Prisma()
    await db.connect()

    # Reset si demandé
    if CONFIG["reset_db"]:
        await reset_database(db)
        await clear_media_files()

    # Création des catégories
    categories = []
    for cat_name in ARTICLE_TYPES:
        try:
            cat = await db.category.create(
                data={
                    "name": cat_name,
                    "slug": create_slug(cat_name)
                }
            )
            categories.append(cat)
        except Exception:
            # Si la catégorie existe déjà
            existing = await db.category.find_first(where={"slug": create_slug(cat_name)})
            if existing:
                categories.append(existing)

    # Création des tags
    tags = []
    for tag_name in TAGS:
        try:
            tag = await db.tag.upsert(
                where={"name": tag_name},
                data={
                    "create": {"name": tag_name},
                    "update": {}
                }
            )
            tags.append(tag)
        except Exception as e:
            print(f"Erreur création tag {tag_name}: {e}")
            continue

    # Création des auteurs
    authors = []
    for _ in range(CONFIG["nb_authors"]):
        author = await create_author(db)
        if author:
            authors.append(author)

    # Création des articles
    success_count = 0
    for _ in range(CONFIG["nb_articles"]):
        if not authors or not categories or not tags:
            break
            
        author = random.choice(authors)
        category = random.choice(categories)
        selected_tags = random.sample(tags, k=min(3, len(tags)))
        
        if await create_article(db, author.id, category.id, [t.id for t in selected_tags]):
            success_count += 1
            # Mise à jour du compteur d'articles
            await db.author.update(
                where={"id": author.id},
                data={"articlesCount": {"increment": 1}}
            )

    print(f"Terminé ! {success_count} articles créés.")
    await db.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
