import json
from prisma import Prisma
from datetime import datetime
import asyncio
import aiohttp
import aiofiles
import os
from typing import List, Dict

async def download_image(session: aiohttp.ClientSession, url: str, filepath: str):
    """Download an image from a URL and save it to a file."""
    # Ensure the directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    async with session.get(url) as response:
        if response.status == 200:
            async with aiofiles.open(filepath, mode='wb') as f:
                await f.write(await response.read())
                return True
    return False

async def download_author_images(session: aiohttp.ClientSession, author_slug: str):
    """Download both avatar and banner images for an author."""
    # Define the base URLs for DiceBear
    avatar_url = f"https://api.dicebear.com/9.x/initials/svg?seed={author_slug}"
    banner_url = f"https://api.dicebear.com/9.x/glass/svg?seed={author_slug}"
    
    # Define the paths where we'll save the images
    avatar_path = f"public/avatars/{author_slug}.svg"
    banner_path = f"public/banners/{author_slug}.svg"
    
    # Download both images
    avatar_success = await download_image(session, avatar_url, avatar_path)
    banner_success = await download_image(session, banner_url, banner_path)
    
    return {
        "avatar": f"/avatars/{author_slug}.svg" if avatar_success else "/placeholder.svg",
        "banner": f"/banners/{author_slug}.svg" if banner_success else "/placeholder.svg"
    }

async def seed_database():
    db = Prisma()
    await db.connect()

    # Clean existing data
    await db.component.delete_many()
    await db.article.delete_many()
    await db.tag.delete_many()
    await db.category.delete_many()
    await db.education.delete_many()
    await db.author.delete_many()

    # Load JSON data
    with open('data/authors.json', 'r', encoding='utf-8') as f:
        authors_data = json.load(f)
    
    with open('data/articles.json', 'r', encoding='utf-8') as f:
        articles_data = json.load(f)

    # Additional authors
    additional_authors = [
        {
            "name": "Dr. Émilie Bernard",
            "slug": "emilie-bernard",
            "title": "Docteure en Neurosciences",
            "affiliation": "Institut du Cerveau",
            "bio": "Dr. Émilie Bernard est spécialisée dans l'étude des maladies neurodégénératives et le développement de thérapies innovantes.",
            "expertise": ["Neurosciences", "Maladies neurodégénératives", "Thérapie génique", "Neurobiologie"],
            "education": [
                {
                    "degree": "Doctorat en Neurosciences",
                    "institution": "Université de Lyon",
                    "year": "2015"
                }
            ],
            "email": "emilie.bernard@icm.fr",
            "twitter": "@EmilieNeuro",
            "linkedin": "emilie-bernard-neuro",
            "articlesCount": 25,
            "citations": 1580,
            "hIndex": 17,
            "avatar": "/placeholder.svg"
        },
        {
            "name": "Prof. Marc Lambert",
            "slug": "marc-lambert",
            "title": "Professeur en Robotique",
            "affiliation": "INRIA",
            "bio": "Prof. Marc Lambert est un expert en robotique et intelligence artificielle, spécialisé dans les systèmes autonomes et la robotique collaborative.",
            "expertise": ["Robotique", "IA", "Systèmes autonomes", "Robotique collaborative"],
            "education": [
                {
                    "degree": "Doctorat en Robotique",
                    "institution": "École Centrale Paris",
                    "year": "2008"
                }
            ],
            "email": "marc.lambert@inria.fr",
            "twitter": "@MarcRobotics",
            "linkedin": "marc-lambert-robotics",
            "articlesCount": 45,
            "citations": 2800,
            "hIndex": 24,
            "avatar": "/placeholder.svg"
        }
    ]

    # Additional articles
    additional_articles = [
        {
            "id": "brain-plasticity",
            "title": "Plasticité cérébrale et récupération post-AVC",
            "slug": "brain-plasticity",
            "description": "Une étude approfondie des mécanismes de plasticité cérébrale impliqués dans la récupération après un AVC.",
            "content": "La plasticité cérébrale est un mécanisme fondamental...",
            "publishedAt": "2025-06-01",
            "readTime": "13 min",
            "featured": True,
            "views": 1890,
            "citations": 16,
            "category": {
                "name": "Neurosciences",
                "slug": "neurosciences"
            },
            "tags": ["plasticité cérébrale", "AVC", "réhabilitation", "neurosciences"],
            "author": {
                "name": "Dr. Émilie Bernard",
                "slug": "emilie-bernard"
            }
        },
        {
            "id": "robot-collaboration",
            "title": "Robotique collaborative: Nouveaux paradigmes d'interaction",
            "slug": "robot-collaboration",
            "description": "Analyse des dernières avancées en robotique collaborative et leurs implications pour l'industrie 4.0.",
            "content": "La robotique collaborative transforme rapidement notre approche de l'automatisation...",
            "publishedAt": "2025-06-15",
            "readTime": "10 min",
            "featured": True,
            "views": 2100,
            "citations": 12,
            "category": {
                "name": "Robotique",
                "slug": "robotique"
            },
            "tags": ["robotique", "collaboration", "industrie 4.0", "automatisation"],
            "author": {
                "name": "Prof. Marc Lambert",
                "slug": "marc-lambert"
            }
        }
    ]

    # Merge existing and additional data
    all_authors = authors_data["authors"] + additional_authors
    all_articles = articles_data["articles"] + additional_articles

    # Create categories
    categories: Dict[str, str] = {}
    for article in all_articles:
        cat = article["category"]
        if cat["slug"] not in categories:
            category = await db.category.create(
                data={
                    "name": cat["name"],
                    "slug": cat["slug"]
                }
            )
            categories[cat["slug"]] = category.id

    # Download images for all authors
    async with aiohttp.ClientSession() as session:
        # Create authors with their education
        authors_map: Dict[str, str] = {}
        for author in all_authors:
            # Download author images
            images = await download_author_images(session, author["slug"])
            
            created_author = await db.author.create(
                data={
                    "name": author["name"],
                    "slug": author["slug"],
                    "title": author["title"],
                    "affiliation": author["affiliation"],
                    "bio": author["bio"],
                    "expertise": author["expertise"],
                    "email": author.get("contact", {}).get("email", author.get("email")),
                    "twitter": author.get("contact", {}).get("twitter"),
                    "linkedin": author.get("contact", {}).get("linkedin"),
                    "orcid": author.get("contact", {}).get("orcid"),
                    "researchgate": author.get("contact", {}).get("researchgate"),
                    "articlesCount": author.get("stats", {}).get("articles", author.get("articlesCount", 0)),
                    "citations": author.get("stats", {}).get("citations", author.get("citations", 0)),
                    "hIndex": author.get("stats", {}).get("hIndex", author.get("hIndex", 0)),
                    "avatar": images["avatar"]
                }
            )
            authors_map[author["slug"]] = created_author.id

            # Create education entries
            for edu in author.get("education", []):
                await db.education.create(
                    data={
                        "degree": edu["degree"],
                        "institution": edu["institution"],
                        "year": edu["year"],
                        "authorId": created_author.id
                    }
                )

        # Create tags
        tags: Dict[str, str] = {}
        for article in all_articles:
            for tag_name in article["tags"]:
                if tag_name not in tags:
                    tag = await db.tag.create(
                        data={
                            "name": tag_name
                        }
                    )
                    tags[tag_name] = tag.id

        # Create articles
        for article in all_articles:
            # Create article
            created_article = await db.article.create(
                data={
                    "title": article["title"],
                    "slug": article["slug"],
                    "description": article["description"],
                    "content": article["content"],
                    "publishedAt": datetime.fromisoformat(article["publishedAt"]),
                    "readTime": article["readTime"],
                    "featured": article["featured"],
                    "views": article["views"],
                    "citations": article["citations"],
                    "authorId": authors_map[article["author"]["slug"]],
                    "categoryId": categories[article["category"]["slug"]],
                    "tags": {
                        "connect": [{"id": tags[tag_name]} for tag_name in article["tags"]]
                    }
                }
            )

            # Add a sample component for each article
            component_data = json.dumps({
                "url": f"/articles/{article['slug']}/header.jpg",
                "alt": article["title"]
            })
            
            await db.component.create(
                data={
                    "type": "image",
                    "data": component_data,
                    "articleId": created_article.id
                }
            )

    await db.disconnect()

if __name__ == "__main__":
    asyncio.run(seed_database()) 
