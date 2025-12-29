import type { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

// Bot User-Agent patterns for AI search and social crawlers
const BOT_PATTERNS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "bingbot",
  "Googlebot",
  "facebookexternalhit",
  "WhatsApp",
  "Twitterbot",
  "Slackbot",
  "Discordbot",
  "LinkedInBot",
];

// Route to snapshot file mapping
const SNAPSHOT_ROUTES: Record<string, string> = {
  "/": "home.html",
  "/partners": "partners.html",
  "/quality": "quality.html",
  "/faq": "faq.html",
  "/for-brands": "for-brands.html",
};

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.some((pattern) => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
}

function acceptsHtml(acceptHeader: string | undefined): boolean {
  if (!acceptHeader) return false;
  return acceptHeader.includes("text/html") || acceptHeader.includes("*/*");
}

export function registerBotSnapshots(app: Express): void {
  const snapshotsDir = path.join(process.cwd(), "server", "snapshots");

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only handle GET and HEAD requests
    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }

    // Check if this route has a snapshot
    const snapshotFile = SNAPSHOT_ROUTES[req.path];
    if (!snapshotFile) {
      return next();
    }

    // Check if request is from a bot and accepts HTML
    const userAgent = req.get("User-Agent");
    const acceptHeader = req.get("Accept");

    if (!isBot(userAgent) || !acceptsHtml(acceptHeader)) {
      return next();
    }

    // Serve the snapshot
    const snapshotPath = path.join(snapshotsDir, snapshotFile);
    
    if (!fs.existsSync(snapshotPath)) {
      console.warn(`Snapshot file not found: ${snapshotPath}`);
      return next();
    }

    res.set("Content-Type", "text/html; charset=utf-8");
    res.sendFile(snapshotPath);
  });
}
