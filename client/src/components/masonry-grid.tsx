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
  columnWidth?: number;
  gap?: number;
}

export default function MasonryGrid({
  images,
  columnWidth = 300,
  gap = 16,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const newColumns = Math.max(1, Math.floor(containerWidth / (columnWidth + gap)));
      setColumns(newColumns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columnWidth, gap]);

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
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columnItems.map((column, i) => (
        <div key={i} className="flex flex-col gap-4">
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