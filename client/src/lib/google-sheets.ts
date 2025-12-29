import { z } from "zod";

// Schema for Product Data
export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Simple in-memory cache
let cache: { data: Product[], timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to clear cache - call after uploading new products
export function clearProductCache(): void {
  cache = null;
  console.log('[Google Sheets] Cache cleared');
}

export async function fetchProducts(): Promise<Product[]> {
  // Check cache
  if (cache && (Date.now() - cache.timestamp < CACHE_DURATION)) {
    console.log('[Google Sheets] Returning cached products');
    return cache.data;
  }

  try {
    console.log('[Google Sheets] Fetching all products from /api/products');
    const response = await fetch('/api/products');
    const data = await response.json();
    
    console.log('[Google Sheets] API Response:', data);
    
    if (data.success && data.products) {
      cache = {
        data: data.products,
        timestamp: Date.now()
      };
      console.log(`[Google Sheets] Loaded ${data.products.length} products`);
      return data.products;
    }
    
    console.warn('[Google Sheets] API returned success=false or no products');
    return [];
  } catch (error) {
    console.error('[Google Sheets] Error fetching products from API:', error);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    console.log(`[Google Sheets] Fetching products for category: ${category}`);
    const response = await fetch(`/api/products/${encodeURIComponent(category)}`);
    const data = await response.json();
    
    console.log(`[Google Sheets] Category API Response for "${category}":`, data);
    
    if (data.success && data.products) {
      console.log(`[Google Sheets] Found ${data.products.length} products in category "${category}"`);
      return data.products;
    }
    
    console.warn(`[Google Sheets] No products found for category "${category}"`);
    return [];
  } catch (error) {
    console.error(`[Google Sheets] Error fetching products for category "${category}":`, error);
    return [];
  }
}
