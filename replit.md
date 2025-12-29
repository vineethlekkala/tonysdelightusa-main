# Tony's Delight USA - Product Management System

## Overview

Tony's Delight USA is a modern, responsive company website for a premium food wholesale distributor serving the United States market. The application features a product catalog system powered by Google Sheets for data storage and Cloudinary for image hosting. The website showcases various food categories including basmati rice, seafood, frozen products, dry products, and imported brands.

The system allows administrators to upload new products through a dedicated admin panel, with changes reflected on the website automatically without requiring redeployment.

## Recent Changes (December 2024)

**SEO Optimizations:**
- Added `/robots.txt` with AI bot allowances (OAI-SearchBot, ChatGPT-User, bingbot, Googlebot allowed; GPTBot disallowed)
- Added `/llms.txt` plain text AI-friendly page index
- Added HTML snapshot system for bot crawlers:
  - Snapshots in `server/snapshots/` for home, partners, quality, faq, for-brands routes
  - Bot detection middleware (`server/botSnapshots.ts`) serves static HTML to search engine/AI bots
  - Regular users receive the SPA unchanged
- Existing SEO assets: `/sitemap.xml`, meta tags, favicon

**Conversion from UK to USA Website:**
- Updated brand name from "Tony's Delight UK" to "Tony's Delight USA"
- Removed all WhatsApp references site-wide
- Updated contact information:
  - Email: info@tonysdelight.com
  - Phone: +1 (512) 737-2956
  - Location: United States (Texas)
- Updated URL structure for product categories:
  - `/products/dry` (was `/dry-products`)
  - `/products/frozen` (was `/frozen-products`)
  - `/products/seafood` (was `/seafood`)
  - `/products/imported-brands` (was `/imported-brands`)
  - `/products/lal-qilla-basmati` (was `/lal-qilla-basmati`)
- Removed Jobs page from navigation
- Updated all CTAs to point to `/contact` or phone/email links
- Added founders section with Tony Philip Perumpankuzhy, Vineeth Reddy Lekkala
- Added family section with Sheba, Tashi Lekkala, Vihaan

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React with TypeScript for the UI layer
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and caching

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui design system (New York style variant)
- Tailwind CSS v4 for styling with custom theme configuration
- Framer Motion for animations and scroll-based transitions

**Design Approach:**
The application uses a modern, clean aesthetic with custom CSS variables for theming. The design includes smooth scroll transitions similar to DailyDelight.com, with parallax effects and image transitions on the homepage. The site is fully responsive with mobile-first considerations.

**Page Structure:**
- Homepage (`/`) with hero section and category showcase
- About Us (`/about`) with company story and founders info
- Products index (`/products`) with category navigation
- Category-specific product pages:
  - Dry Products (`/products/dry`)
  - Frozen Products (`/products/frozen`)
  - Seafood (`/products/seafood`)
  - Imported Brands (`/products/imported-brands`)
  - Lal Qilla Basmati (`/products/lal-qilla-basmati`)
- Contact (`/contact`) with form and contact information
- Admin upload panel at `/admin`

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js
- TypeScript throughout the server codebase
- HTTP server for API endpoints

**API Design:**
RESTful endpoints:
- `GET /api/health` - Health check endpoint
- `GET /api/products` - Fetch all products from Google Sheets
- `GET /api/products/:category` - Fetch products filtered by category
- `POST /api/admin/upload-product` - Admin endpoint for product uploads
- `GET /api/brands/featured` - Fetch featured brand logos from `/public/assets/brands/homepage/`
- `GET /api/brands/all` - Fetch all brand logos from `/public/assets/brands/all/`

**Data Flow:**
1. Admin uploads product via form (title, description, category, image file)
2. Image is converted to base64 and sent to backend
3. Backend uploads image to Cloudinary
4. Backend appends new row to Google Sheets with product data
5. Frontend fetches products from Google Sheets via API
6. Products are cached for 5 minutes to reduce API calls

**Caching Strategy:**
Node-Cache is used server-side with a 5-minute TTL to cache Google Sheets data, reducing API calls and improving performance.

### Data Storage

**Google Sheets as Database:**
- Sheet columns: `imageUrl`, `title`, `description`, `category`
- Products are stored in rows with headers in Row 1
- Google Sheets API v4 is used for read/write operations
- Service account authentication via JSON key file
- Data is read from `Sheet1!A2:D` range (skipping headers)

**Rationale:**
Google Sheets provides a simple, non-technical way for the client to manage products without database expertise. Changes to the sheet are reflected on the website after cache expiration.

**Alternative Considered:**
PostgreSQL database (Drizzle ORM is configured but not actively used for products). This would provide better performance and query capabilities but requires technical knowledge for data management.

### External Dependencies

**Google Cloud Services:**
- **Google Sheets API:** Product data storage and retrieval
- **Service Account Authentication:** Uses `google-service-account.json` for API access
- **Required Scopes:** `https://www.googleapis.com/auth/spreadsheets`
- **Configuration:** Requires `GOOGLE_SHEET_ID` environment variable

**Cloudinary:**
- **Image Hosting:** All product images are uploaded to Cloudinary
- **Image Transformations:** Cloudinary provides optimized image delivery
- **Configuration:** Requires `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **Upload Folder:** Images stored in `tonys-delight-products` folder

**Database (Optional):**
- **Neon PostgreSQL:** Configured via Drizzle ORM but not actively used for product storage
- **Schema Definition:** User schema exists in `shared/schema.ts`
- **Connection:** Via `DATABASE_URL` environment variable
- The code agent may add PostgreSQL for other features like user authentication or order management

**Third-Party UI Libraries:**
- Radix UI components for accessible interactions
- Lucide React for icons
- Framer Motion for animations
- React Hook Form with Zod for form validation

**Development Tools:**
- ESBuild for production builds
- TypeScript for type safety
- Replit-specific plugins for development (runtime error modal, cartographer, dev banner)

**Session Management:**
- `connect-pg-simple` and `express-session` packages are available for future session-based authentication
