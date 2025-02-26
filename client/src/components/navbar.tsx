import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { Search, Heart, Home, LogOut, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  if (!user) return null;

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-lg border rounded-full px-6 py-3 shadow-lg flex items-center gap-2">
        <Link href="/">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="icon"
            className="rounded-full transition-transform hover:scale-110"
          >
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/search">
          <Button
            variant={isActive("/search") ? "default" : "ghost"}
            size="icon"
            className="rounded-full transition-transform hover:scale-110"
          >
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/favorites">
          <Button
            variant={isActive("/favorites") ? "default" : "ghost"}
            size="icon"
            className="rounded-full transition-transform hover:scale-110"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-transform hover:scale-110"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          ) : (
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-transform hover:scale-110"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}