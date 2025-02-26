import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Download, Diamond, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface WallpaperCardProps {
  image: {
    id: string;
    url: string;
    title: string;
    isPremium?: boolean;
    isCoins?: boolean;
  };
  height?: number;
}

export default function WallpaperCard({ image, height = 300 }: WallpaperCardProps) {
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
      className="relative overflow-hidden group transition-transform duration-200 hover:scale-[1.02]"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover"
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
          className="bg-white/20 hover:bg-white/30"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={downloadImage}
          className="bg-white/20 hover:bg-white/30"
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>

      {image.isPremium && (
        <div className="absolute top-2 right-2 bg-primary px-2 py-1 rounded-full flex items-center gap-1 text-sm">
          <Diamond className="h-4 w-4" />
          <span>Premium</span>
        </div>
      )}

      {image.isCoins && (
        <div className="absolute top-2 left-2 bg-yellow-500 px-2 py-1 rounded-full flex items-center gap-1 text-sm">
          <Coins className="h-4 w-4" />
          <span>Coins</span>
        </div>
      )}
    </Card>
  );
}