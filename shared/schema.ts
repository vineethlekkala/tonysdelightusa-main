import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const homepageImages = pgTable("homepage_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slotId: text("slot_id").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  description: text("description"),
});

export const insertHomepageImageSchema = createInsertSchema(homepageImages).omit({
  id: true,
});

export type InsertHomepageImage = z.infer<typeof insertHomepageImageSchema>;
export type HomepageImage = typeof homepageImages.$inferSelect;
