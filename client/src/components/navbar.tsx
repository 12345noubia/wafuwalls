import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Search, Heart, Home, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost">
              <Home className="h-5 w-5 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="ghost">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="ghost">
              <Heart className="h-5 w-5 mr-2" />
              Favorites
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user.username}
          </span>
          <Button
            variant="ghost"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
