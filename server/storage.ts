import { IStorage } from "./storage";
import { User, InsertUser, Favorite, InsertFavorite } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private favorites: Map<number, Favorite>;
  sessionStore: session.Store;
  currentId: number;
  currentFavoriteId: number;

  constructor() {
    this.users = new Map();
    this.favorites = new Map();
    this.currentId = 1;
    this.currentFavoriteId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      (favorite) => favorite.userId === userId,
    );
  }

  async addFavorite(userId: number, favorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const newFavorite: Favorite = { ...favorite, id, userId };
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }

  async removeFavorite(id: number, userId: number): Promise<void> {
    const favorite = this.favorites.get(id);
    if (favorite && favorite.userId === userId) {
      this.favorites.delete(id);
    }
  }
}

export const storage = new MemStorage();
