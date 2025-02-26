import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MasonryGrid from "@/components/masonry-grid";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      );
      const data = await response.json();
      const searchResults = data.results.map((item: any) => ({
        id: item.id,
        url: item.urls.regular,
        title: item.alt_description || "Untitled",
      }));
      setImages(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search wallpapers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {images.length > 0 && (
        <MasonryGrid images={images} />
      )}
    </div>
  );
}
