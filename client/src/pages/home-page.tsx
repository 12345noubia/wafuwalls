import { useState, useEffect } from "react";
import MasonryGrid from "@/components/masonry-grid";
import { Button } from "@/components/ui/button";

interface Image {
  id: string;
  url: string;
  title: string;
}

export default function HomePage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=30&page=${page}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      );
      const data = await response.json();
      const newImages = data.map((item: any) => ({
        id: item.id,
        url: item.urls.regular,
        title: item.alt_description || "Untitled",
      }));
      setImages((prev) => [...prev, ...newImages]);
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
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
