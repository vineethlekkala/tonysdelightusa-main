import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Make database optional - only needed for homepage image management
let db: any = null;

if (process.env.DATABASE_URL && process.env.DATABASE_URL !== "postgresql://user:pass@localhost:5432/tonysdelight?sslmode=disable") {
  try {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
    console.log("✓ Database connected");
  } catch (error) {
    console.warn("⚠ Database connection failed - homepage images will not work");
  }
} else {
  console.warn("⚠ DATABASE_URL not configured - homepage images will not be available");
}

export { db };
