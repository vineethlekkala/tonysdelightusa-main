import "dotenv/config";
import express from "express";
import serverless from "serverless-http";
import path from "path";
import { registerRoutes } from "../server/routes";
import { registerBotSnapshots } from "../server/botSnapshots";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Serve static files (use process.cwd() for Vercel serverless compatibility)
app.use(express.static(path.join(process.cwd(), "dist/public")));

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Setup routes
let isSetup = false;

async function setupApp() {
  if (isSetup) return;

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  registerBotSnapshots(app);

  // Serve static files from dist/public in production
  app.use(express.static(path.join(process.cwd(), "dist/public")));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/public/index.html"));
  });

  isSetup = true;
}

// Initialize on first request
const handler = serverless(app, {
  request: async (req: any, event: any) => {
    await setupApp();
  },
});

// Use CommonJS export for Vercel compatibility
module.exports = handler;
