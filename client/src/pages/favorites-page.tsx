import { useQuery } from "@tanstack/react-query";
import MasonryGrid from "@/components/masonry-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["/api/favorites"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  const images = favorites?.map((fav: any) => ({
    id: fav.id.toString(),
    url: fav.imageUrl,
    title: fav.title,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
      {images.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You haven't added any favorites yet.
        </p>
      ) : (
        <MasonryGrid images={images} />
      )}
    </div>
  );
}
