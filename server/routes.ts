import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import {
  getAllProducts,
  getProductsByCategory,
  appendProductRow,
} from "./src/services/googleSheetsService";
import { uploadImage } from "./src/services/cloudinaryService";
import { storage } from "./storage";

function formatBrandName(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(png|jpg|jpeg|webp|svg|gif)$/i, "");
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getLogosFromFolder(folderPath: string): Array<{ name: string; filename: string; path: string }> {
  const fullPath = path.join(process.cwd(), "public", folderPath);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
  
  return files
    .filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
    .map((file) => ({
      name: formatBrandName(file),
      filename: file,
      path: `/${folderPath}/${file}`,
    }));
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Tony's Delight API is running" });
  });

  // Sitemap.xml - served before frontend router
  app.get("/sitemap.xml", (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tonysdelight.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products/dry</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products/frozen</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products/seafood</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products/imported-brands</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/products/lal-qilla-basmati</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/for-brands</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/partners</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/quality</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/faq</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/jobs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://tonysdelight.com/contact</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
    res.set("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Robots.txt - served before frontend router
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: bingbot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: https://tonysdelight.com/sitemap.xml`;
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  // llms.txt - AI-friendly plain text index
  app.get("/llms.txt", (req, res) => {
    const llmsTxt = `Tony's Delight USA is a wholesale and distribution company supporting food and consumer packaged goods brands in the United States.

Primary pages:
- https://tonysdelight.com/
- https://tonysdelight.com/products
- https://tonysdelight.com/partners
- https://tonysdelight.com/quality
- https://tonysdelight.com/faq
- https://tonysdelight.com/for-brands
- https://tonysdelight.com/jobs
- https://tonysdelight.com/contact

Global presence:
- https://tonysdelight.co.uk
- https://tonysdelighteu.com`;
    res.set("Content-Type", "text/plain");
    res.send(llmsTxt);
  });

  // Get featured brand logos (homepage)
  app.get("/api/brands/featured", (req, res) => {
    try {
      const logos = getLogosFromFolder("assets/brands/homepage");
      res.json({ success: true, logos });
    } catch (error) {
      console.error("Error fetching featured brand logos:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch brand logos" 
      });
    }
  });

  // Get all brand logos (imported brands page)
  app.get("/api/brands/all", (req, res) => {
    try {
      const logos = getLogosFromFolder("assets/brands/all");
      res.json({ success: true, logos });
    } catch (error) {
      console.error("Error fetching all brand logos:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch brand logos" 
      });
    }
  });

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json({ success: true, products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch products" 
      });
    }
  });

  // Get products by category
  app.get("/api/products/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await getProductsByCategory(category);
      res.json({ success: true, products });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch products" 
      });
    }
  });

  // Admin upload endpoint
  app.post("/api/admin/upload-product", async (req, res) => {
    try {
      const { title, description, category, imageBase64 } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ 
          success: false, 
          message: "Image is required" 
        });
      }

      if (!title || !description || !category) {
        return res.status(400).json({ 
          success: false, 
          message: "Title, description, and category are required" 
        });
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadImage(imageBase64);

      // Append to Google Sheet
      await appendProductRow(imageUrl, title, description, category);

      res.json({ 
        success: true, 
        imageUrl,
        message: "Product uploaded successfully" 
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to upload product" 
      });
    }
  });

  // Get all homepage images
  app.get("/api/homepage-images", async (req, res) => {
    try {
      const images = await storage.getAllHomepageImages();
      res.json({ success: true, images });
    } catch (error) {
      console.error("Error fetching homepage images:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch homepage images" 
      });
    }
  });

  // Get single homepage image by slot
  app.get("/api/homepage-images/:slotId", async (req, res) => {
    try {
      const { slotId } = req.params;
      const image = await storage.getHomepageImage(slotId);
      if (image) {
        res.json({ success: true, image });
      } else {
        res.json({ success: true, image: null });
      }
    } catch (error) {
      console.error("Error fetching homepage image:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch homepage image" 
      });
    }
  });

  // Upload homepage image to slot
  app.post("/api/admin/homepage-image", async (req, res) => {
    try {
      const { slotId, imageBase64, title, description } = req.body;

      if (!slotId || !imageBase64) {
        return res.status(400).json({ 
          success: false, 
          message: "Slot ID and image are required" 
        });
      }

      const imageUrl = await uploadImage(imageBase64);

      const image = await storage.upsertHomepageImage({
        slotId,
        imageUrl,
        title: title || null,
        description: description || null,
      });

      res.json({ 
        success: true, 
        image,
        message: "Homepage image uploaded successfully" 
      });
    } catch (error) {
      console.error("Error uploading homepage image:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to upload homepage image" 
      });
    }
  });

  // Delete homepage image
  app.delete("/api/admin/homepage-image/:slotId", async (req, res) => {
    try {
      const { slotId } = req.params;
      await storage.deleteHomepageImage(slotId);
      res.json({ success: true, message: "Homepage image deleted successfully" });
    } catch (error) {
      console.error("Error deleting homepage image:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to delete homepage image" 
      });
    }
  });

  // Contact form email endpoint
  app.post("/api/send-message", async (req, res) => {
    try {
      const { name, company, email, phone, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Name, email, and message are required" 
        });
      }

      const gmailPassword = process.env.GMAIL_APP_PASSWORD;
      
      if (!gmailPassword) {
        console.error("GMAIL_APP_PASSWORD not configured");
        return res.status(500).json({ 
          success: false, 
          message: "Email service not configured" 
        });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "info@tonysdelight.co.uk",
          pass: gmailPassword,
        },
      });

      const emailContent = `
New Message from Tony's Delight UK Website

Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `.trim();

      await transporter.sendMail({
        from: '"Tony\'s Delight Website" <info@tonysdelight.co.uk>',
        to: "info@tonysdelight.co.uk",
        subject: "New Message from Tony's Delight UK Website",
        text: emailContent,
        replyTo: email,
      });

      res.json({ 
        success: true, 
        message: "Message sent successfully" 
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to send message" 
      });
    }
  });

  return httpServer;
}
