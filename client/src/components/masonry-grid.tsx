import { useEffect, useRef, useState } from "react";
import WallpaperCard from "./wallpaper-card";

interface MasonryGridProps {
  images: Array<{
    id: string;
    url: string;
    title: string;
    isPremium?: boolean;
    isCoins?: boolean;
  }>;
  gap?: number;
}

export default function MasonryGrid({
  images,
  gap = 8,
}: MasonryGridProps) {
  const [columns, setColumns] = useState(2); // Default to 2 columns for mobile
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      // Use 2 columns for mobile, 3 for larger screens
      const newColumns = width > 768 ? 3 : 2;
      setColumns(newColumns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columnHeights = Array(columns).fill(0);
  const columnItems = Array(columns).fill(0).map(() => []);

  images.forEach((image) => {
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    const randomHeight = 200 + Math.floor(Math.random() * 150); // 200-350px
    columnItems[shortestColumn].push({ ...image, randomHeight });
    columnHeights[shortestColumn] += randomHeight + gap;
  });

  return (
    <div
      ref={containerRef}
      className="w-full pb-24" // Add padding for floating navbar
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columnItems.map((column, i) => (
        <div key={i} className="flex flex-col gap-2">
          {column.map((image) => (
            <WallpaperCard 
              key={image.id} 
              image={image}
              height={image.randomHeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
}