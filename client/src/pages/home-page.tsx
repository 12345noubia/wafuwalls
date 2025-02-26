import { useState, useEffect, useRef, useCallback } from "react";
import MasonryGrid from "@/components/masonry-grid";
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchImages = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const url = `https://api.waifu.im/search/?included_tags=waifu&many=true&amount=10&exclude_tags=nsfw&ts=${Date.now()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.images) {
        const newImages = data.images.map(randomizeItem);
        setImages((prev) => [...prev, ...newImages]);
        setPage((p) => p + 1);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for infinite scrolling
  const observer = useRef<IntersectionObserver>();
  const lastImageRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchImages();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    fetchImages();
  }, []); // Initial load

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Discover Wallpapers</h1>
      <MasonryGrid images={images} />
      <div ref={lastImageRef} className="h-10 flex items-center justify-center">
        {loading && <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
    </div>
  );
}