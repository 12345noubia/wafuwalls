import { useState, useEffect } from "react";
import MasonryGrid from "@/components/masonry-grid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Image {
  id: string;
  url: string;
  title: string;
  isPremium?: boolean;
  isCoins?: boolean;
}

function randomizeItem(item: any): Image {
  // 20% chance Premium, 15% chance Coins
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

export default function HomePage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const url = `https://api.waifu.im/search/?included_tags=waifu&many=true&amount=10&exclude_tags=nsfw&ts=${Date.now()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.images) {
        const newImages = data.images.map(randomizeItem);
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Discover Wallpapers</h1>

      <MasonryGrid images={images} />

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </div>
  );
}