import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Favorites routes
  app.get("/api/favorites", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const favorites = await storage.getFavorites(req.user.id);
    res.json(favorites);
  });

  app.post("/api/favorites", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const favorite = await storage.addFavorite(req.user.id, req.body);
    res.json(favorite);
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.removeFavorite(parseInt(req.params.id), req.user.id);
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
