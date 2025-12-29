import { google } from "googleapis";
import NodeCache from "node-cache";
import path from "path";
import fs from "fs";

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "YOUR_SHEET_ID_HERE";

// Path to service account JSON file - use project root for bundled compatibility
const KEY_FILE_PATH = path.join(process.cwd(), "server/src/config/google-service-account.json");

export interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

// Initialize Google Sheets API with service account
function getSheetsClient() {
  // Try to load credentials from file
  if (fs.existsSync(KEY_FILE_PATH)) {
    console.log("[GoogleSheets] Using service account credentials from file");
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }
  
  console.error("[GoogleSheets] No credentials file found at:", KEY_FILE_PATH);
  throw new Error("Google Sheets credentials not configured");
}

export async function getAllProducts(): Promise<Product[]> {
  const cacheKey = "allProducts";
  const cached = cache.get<Product[]>(cacheKey);
  
  if (cached) {
    console.log("[GoogleSheets] Returning cached products:", cached.length);
    return cached;
  }

  console.log("[GoogleSheets] Fetching products from Sheet ID:", SHEET_ID);

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A2:D", // Assuming headers in row 1: imageUrl, title, description, category
    });

    const rows = response.data.values || [];
    console.log("[GoogleSheets] Loaded rows from sheet:", rows.length);
    console.log("[GoogleSheets] Raw data sample:", rows.slice(0, 2));
    
    const products: Product[] = rows.map((row, index) => ({
      id: `product-${index + 1}`,
      imageUrl: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      category: row[3] || "",
    }));

    console.log("[GoogleSheets] Parsed products:", products.length);
    cache.set(cacheKey, products);
    return products;
  } catch (error) {
    console.error("[GoogleSheets] Error fetching from Google Sheets:", error);
    // Return empty array if Sheet isn't configured yet
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  console.log("[GoogleSheets] Filtering by category:", category);
  const allProducts = await getAllProducts();
  const filtered = allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  console.log(`[GoogleSheets] Found ${filtered.length} products for category "${category}"`);
  return filtered;
}

export async function appendProductRow(
  imageUrl: string,
  title: string,
  description: string,
  category: string
): Promise<void> {
  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[imageUrl, title, description, category]],
      },
    });

    // Clear cache after adding new product
    cache.del("allProducts");
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    throw new Error("Failed to save product to Google Sheets");
  }
}
