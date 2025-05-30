"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { getAllArticles, getCategories, formatDate } from "@/lib/data"

export function SearchArticles() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const allArticles = getAllArticles()
  const categories = getCategories()

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.author.name.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category.slug === selectedCategory)
    }

    // Sort articles
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case "popular":
          return b.views - a.views
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [searchQuery, selectedCategory, sortBy, allArticles])

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("recent")
  }

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== "all" || sortBy !== "recent"

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
<Select value={selectedCategory} onValueChange={setSelectedCategory}>
  <SelectTrigger
    className="w-full sm:w-48"
    aria-label={selectedCategory === "all" ? "Toutes les catégories" : `Catégorie: ${categories.find(c => c.slug === selectedCategory)?.name}`}
  >
    <SelectValue placeholder="Catégorie" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">Toutes les catégories</SelectItem>
    {categories.map((category) => (
      <SelectItem key={category.slug} value={category.slug}>
        {category.name} ({category.count})
      </SelectItem>
    ))}
  </SelectContent>
</Select>

<Select value={sortBy} onValueChange={setSortBy}>
  <SelectTrigger
    className="w-full sm:w-48"
    aria-label={sortBy === "recent" ? "Trier par: Plus récent" : sortBy === "oldest" ? "Trier par: Plus ancien" : sortBy === "popular" ? "Trier par: Plus populaire" : "Trier par: Titre A-Z"}
  >
    <SelectValue placeholder="Trier par" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="recent">Plus récent</SelectItem>
    <SelectItem value="oldest">Plus ancien</SelectItem>
    <SelectItem value="popular">Plus populaire</SelectItem>
    <SelectItem value="title">Titre A-Z</SelectItem>
  </SelectContent>
</Select>
        {hasActiveFilters && (
          <Button variant="outline" aria-label="Clear filters" onClick={clearSearch} className="whitespace-nowrap">
            <X className="mr-2 h-4 w-4" />
            Effacer
          </Button>
        )}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length !== 1 ? "s" : ""} trouvé
          {filteredAndSortedArticles.length !== 1 ? "s" : ""}
          {searchQuery.trim() && (
            <span>
              {" "}
              pour "<strong>{searchQuery}</strong>"
            </span>
          )}
        </p>
      </div>

      {/* Articles Grid */}
      {filteredAndSortedArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedArticles.map((article) => (
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
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
          <p className="text-muted-foreground mb-4">Essayez de modifier vos critères de recherche ou de navigation.</p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearSearch}>
              Effacer les filtres
            </Button>
          )}
        </div>
      )}
    </div>
  )
}



