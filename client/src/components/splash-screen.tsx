import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Animate out after 2 seconds
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 500); // Call onFinish after fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 bg-background flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Waifu image from API as app icon */}
        <img
          src="https://cdn.waifu.im/6959.jpg"
          alt="Waifu Walls"
          className="w-full h-full object-cover rounded-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-background/10 backdrop-blur-sm rounded-3xl" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-primary animate-pulse">
        Waifu Walls
      </h1>
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}
