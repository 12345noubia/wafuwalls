import { useEffect, useRef, useState } from "react";
import WallpaperCard from "./wallpaper-card";

interface MasonryGridProps {
  images: Array<{
    id: string;
    url: string;
    title: string;
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

  images.forEach((image, i) => {
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    columnItems[shortestColumn].push(image);
    columnHeights[shortestColumn] += 300 + Math.random() * 200; // Random height for variety
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
            <WallpaperCard key={image.id} image={image} />
          ))}
        </div>
      ))}
    </div>
  );
}
