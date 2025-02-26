import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface WallpaperCardProps {
  image: {
    id: string;
    url: string;
    title: string;
  };
}

export default function WallpaperCard({ image }: WallpaperCardProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  const addToFavorites = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/favorites", {
        imageUrl: image.url,
        title: image.title,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to favorites",
        description: "The wallpaper has been added to your favorites.",
      });
    },
  });

  const downloadImage = async () => {
    try {
      const link = document.createElement("a");
      link.href = image.url;
      link.download = `wallpaper-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the wallpaper.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      
      <div
        className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="secondary"
          size="icon"
          onClick={() => addToFavorites.mutate()}
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={downloadImage}
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
