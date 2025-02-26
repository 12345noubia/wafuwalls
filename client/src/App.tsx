import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import FavoritesPage from "@/pages/favorites-page";
import SearchPage from "@/pages/search-page";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <div className="min-h-screen bg-background dark">
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/" component={HomePage} />
        <ProtectedRoute path="/favorites" component={FavoritesPage} />
        <ProtectedRoute path="/search" component={SearchPage} />
        <Route component={NotFound} />
      </Switch>
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;