import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MasonryGrid from "@/components/masonry-grid";
import { Search, Loader2 } from "lucide-react";

interface Image {
  id: string;
  url: string;
  title: string;
  isPremium?: boolean;
  isCoins?: boolean;
}

function randomizeItem(item: any): Image {
  const isPremium = Math.random() < 0.2;
  const isCoins = Math.random() < 0.15;

  return {
    id: item.image_id,
    url: item.url,
    title: item.tags?.[0]?.name || "Beautiful Wallpaper",
    isPremium,
    isCoins,
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.waifu.im/search/?included_tags=${query}&many=true&amount=20`
      );
      const data = await response.json();

      if (data.images) {
        const searchResults = data.images.map(randomizeItem);
        setImages(searchResults);
      }
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
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search
              </>
            )}
          </Button>
        </form>
      </div>

      {images.length > 0 && (
        <MasonryGrid images={images} />
      )}
    </div>
  );
}