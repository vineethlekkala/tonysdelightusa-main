import { type User, type InsertUser, type HomepageImage, type InsertHomepageImage, homepageImages } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getHomepageImage(slotId: string): Promise<HomepageImage | undefined>;
  getAllHomepageImages(): Promise<HomepageImage[]>;
  upsertHomepageImage(data: InsertHomepageImage): Promise<HomepageImage>;
  deleteHomepageImage(slotId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getHomepageImage(slotId: string): Promise<HomepageImage | undefined> {
    if (!db) return undefined;
    try {
      const result = await db
        .select()
        .from(homepageImages)
        .where(eq(homepageImages.slotId, slotId))
        .limit(1);
      return result[0];
    } catch (error) {
      console.error("Error fetching homepage image:", error);
      return undefined;
    }
  }

  async getAllHomepageImages(): Promise<HomepageImage[]> {
    if (!db) return [];
    try {
      return await db.select().from(homepageImages);
    } catch (error) {
      console.error("Error fetching all homepage images:", error);
      return [];
    }
  }

  async upsertHomepageImage(data: InsertHomepageImage): Promise<HomepageImage> {
    if (!db) {
      throw new Error("Database not configured - cannot manage homepage images");
    }
    const existing = await this.getHomepageImage(data.slotId);

    if (existing) {
      const updated = await db
        .update(homepageImages)
        .set({
          imageUrl: data.imageUrl,
          title: data.title,
          description: data.description,
        })
        .where(eq(homepageImages.slotId, data.slotId))
        .returning();
      return updated[0];
    } else {
      const inserted = await db
        .insert(homepageImages)
        .values(data)
        .returning();
      return inserted[0];
    }
  }

  async deleteHomepageImage(slotId: string): Promise<void> {
    if (!db) {
      throw new Error("Database not configured - cannot manage homepage images");
    }
    await db
      .delete(homepageImages)
      .where(eq(homepageImages.slotId, slotId));
  }
}

export const storage = new MemStorage();
