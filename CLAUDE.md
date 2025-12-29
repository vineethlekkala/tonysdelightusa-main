# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tony's Delight USA is a modern, responsive wholesale food distributor website serving the United States market. The application features a product catalog system powered by Google Sheets for data storage and Cloudinary for image hosting.

**Key Tech Stack:**
- Frontend: React + TypeScript + Vite + Wouter (routing) + TanStack Query
- UI: Radix UI + shadcn/ui (New York variant) + Tailwind CSS v4 + Framer Motion
- Backend: Express.js + TypeScript on Node.js
- Data: Google Sheets API (primary product storage) + PostgreSQL via Drizzle ORM (homepage images)
- Image Hosting: Cloudinary
- Build: ESBuild for production, Vite for development

## Development Commands

### Essential Commands
```bash
# Development - runs both client and server
npm run dev            # Start backend server (port 5000)
npm run dev:client     # Start Vite dev server only

# Production
npm run build          # Build for production
npm start              # Start production server

# Type Checking & Database
npm run check          # Run TypeScript type checking
npm run db:push        # Push Drizzle schema to PostgreSQL
```

### Running Development
The application runs on **port 5000** (both dev and production). The backend serves the frontend via Vite in development, and static files in production.

## Architecture Overview

### Dual Data Storage System

**Google Sheets (Primary Product Data):**
- Used for: Product catalog (title, description, category, imageUrl)
- Location: `server/src/services/googleSheetsService.ts`
- Cache: 5-minute TTL via node-cache to reduce API calls
- Admin Upload: `/admin` route allows uploading products with images
- Rationale: Allows non-technical client to manage products via spreadsheet

**PostgreSQL via Drizzle ORM:**
- Used for: Homepage images (slotted image system), user accounts (not actively used)
- Schema: `shared/schema.ts` defines `homepageImages` and `users` tables
- Storage Layer: `server/storage.ts` provides abstraction over database operations
- Connection: Neon PostgreSQL via `DATABASE_URL` environment variable

### Frontend Architecture

**Routing (Wouter):**
The app uses Wouter for client-side routing. Routes defined in `client/src/App.tsx`:
- `/` - Homepage with hero section and category showcase
- `/about` - Company story and founders
- `/products` - Products index
- `/products/dry` - Dry products category
- `/products/frozen` - Frozen products category
- `/products/seafood` - Seafood category
- `/products/imported-brands` - Imported brands (uses brand logo system)
- `/products/lal-qilla-basmati` - Lal Qilla Basmati category
- `/contact` - Contact form
- `/partners` - Partner information
- `/quality` - Quality standards
- `/faq` - FAQ page
- `/for-brands` - Information for brands
- `/jobs` - Job listings
- `/admin` - Admin upload panel (products + homepage images)

**State Management:**
- TanStack Query (React Query) for server state, caching, and data fetching
- Query client configured in `client/src/lib/queryClient.ts`

**Component Structure:**
- Layout: `client/src/components/layout/` (Navbar, Footer)
- UI Components: `client/src/components/ui/` (shadcn/ui components)
- Pages: `client/src/pages/` (route components)
- Custom: `client/src/components/` (ImportedBrandsGrid, etc.)

**Path Aliases:**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Backend Architecture

**API Endpoints (`server/routes.ts`):**

Product APIs:
- `GET /api/products` - Fetch all products from Google Sheets
- `GET /api/products/:category` - Fetch products by category
- `POST /api/admin/upload-product` - Admin upload (requires title, description, category, imageBase64)

Brand Logo APIs:
- `GET /api/brands/featured` - Fetch logos from `/public/assets/brands/homepage/`
- `GET /api/brands/all` - Fetch logos from `/public/assets/brands/all/`
- Brand names are auto-formatted from filenames (e.g., `my-brand-name.png` → "My Brand Name")

Homepage Image APIs:
- `GET /api/homepage-images` - Get all homepage images (PostgreSQL)
- `GET /api/homepage-images/:slotId` - Get single homepage image by slot
- `POST /api/admin/homepage-image` - Upload/update homepage image (requires slotId, imageBase64)
- `DELETE /api/admin/homepage-image/:slotId` - Delete homepage image

Contact Form:
- `POST /api/send-message` - Send contact form email via Nodemailer (Gmail SMTP)

SEO & Bots:
- `GET /sitemap.xml` - XML sitemap
- `GET /robots.txt` - Robots.txt (allows most bots, disallows GPTBot)
- `GET /llms.txt` - AI-friendly plain text page index
- Bot snapshot middleware serves static HTML to search engines (see `server/botSnapshots.ts`)

**Services:**
- `server/src/services/googleSheetsService.ts` - Google Sheets API integration
- `server/src/services/cloudinaryService.ts` - Cloudinary image upload

**Server Entry:** `server/index.ts`
- Configures Express middleware (JSON, URL encoding, static files)
- Registers routes, bot snapshots, and Vite (dev) or static serving (production)
- Logs API requests with timing and JSON responses

### Build System

**Development:**
- Vite dev server proxies API requests to Express backend
- Replit-specific plugins: runtime error modal, cartographer, dev banner (only in Replit environment)

**Production:**
- `script/build.ts` orchestrates the build
- Vite builds frontend to `dist/public`
- ESBuild bundles backend to `dist/index.cjs`
- `npm start` runs the bundled backend which serves static frontend

**Vite Configuration (`vite.config.ts`):**
- Root: `client/` directory
- Output: `dist/public/`
- Custom plugin: `vite-plugin-meta-images.ts` (handles meta image generation)
- Tailwind v4 plugin for CSS processing

## Environment Variables

Required for full functionality:

```bash
# Google Sheets (Product Data)
GOOGLE_SHEET_ID=<your_sheet_id>

# Cloudinary (Image Hosting)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

# PostgreSQL (Homepage Images, Users)
DATABASE_URL=<postgresql_connection_string>

# Email (Contact Form)
GMAIL_APP_PASSWORD=<gmail_app_password>

# Server
PORT=5000  # Default port, usually set by hosting platform
NODE_ENV=development|production
```

**Service Account for Google Sheets:**
Place the JSON key file at `server/src/config/google-service-account.json` (this file is gitignored). See `SETUP.md` for detailed setup instructions.

## Key Files & Directories

**Root Configuration:**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration with path aliases
- `vite.config.ts` - Vite build configuration
- `drizzle.config.ts` - Drizzle ORM configuration for PostgreSQL
- `components.json` - shadcn/ui configuration (New York style, Tailwind v4)

**Frontend:**
- `client/index.html` - HTML entry point
- `client/src/main.tsx` - React entry point
- `client/src/App.tsx` - Root component with routing
- `client/src/index.css` - Global styles and Tailwind directives
- `client/src/pages/` - Page components
- `client/src/components/` - Reusable components

**Backend:**
- `server/index.ts` - Express server entry
- `server/routes.ts` - API route definitions
- `server/db.ts` - Drizzle database client
- `server/storage.ts` - Storage abstraction layer
- `server/botSnapshots.ts` - Bot detection and static HTML serving
- `server/snapshots/` - Pre-rendered HTML for bots
- `server/src/services/` - Google Sheets and Cloudinary services

**Shared:**
- `shared/schema.ts` - Drizzle ORM schema (users, homepageImages)

**Static Assets:**
- `public/` - Static files (brand logos, favicon, etc.)
- `public/assets/brands/homepage/` - Featured brand logos for homepage
- `public/assets/brands/all/` - All brand logos for imported brands page
- `attached_assets/` - Additional assets (screenshots, design references, stock images)

**Documentation:**
- `SETUP.md` - Detailed setup instructions for Google Sheets and Cloudinary
- `replit.md` - Comprehensive project documentation (system architecture, recent changes)

## Important Implementation Details

### Product Upload Flow
1. Admin visits `/admin` and fills form (title, description, category, image file)
2. Image converted to base64 on client
3. POST to `/api/admin/upload-product` with base64 image
4. Backend uploads image to Cloudinary, gets URL
5. Backend appends new row to Google Sheets with product data
6. Products are fetched from Google Sheets and cached for 5 minutes

### Brand Logo System
- Logos are static files in `public/assets/brands/`
- Two folders: `homepage/` (featured) and `all/` (complete list)
- Filenames auto-converted to display names (kebab-case → Title Case)
- No database storage - filesystem-based

### Homepage Image Slots
- PostgreSQL-backed system for managing homepage hero/section images
- Each image has a `slotId` (e.g., "hero-1", "section-2")
- Admin can upload/replace images via `/admin`
- Images uploaded to Cloudinary, URLs stored in database

### SEO Strategy
- Static HTML snapshots in `server/snapshots/` for bots
- Bot detection middleware serves snapshots to search engines/AI crawlers
- Regular users get the React SPA
- Sitemap, robots.txt, and llms.txt for discoverability

### Contact Form
The contact form sends email via Gmail SMTP using Nodemailer. Note that the email configuration in `server/routes.ts` currently references `info@tonysdelight.co.uk` (UK domain), but this is a USA website. You may need to update these email references to match the USA domain.

## Common Development Tasks

### Adding a New Product Category
1. Update Google Sheets with new category name
2. Add route in `client/src/App.tsx`:
   ```tsx
   <Route path="/products/new-category">
     {() => <Products initialCategory="New Category Name" />}
   </Route>
   ```
3. Update navigation in `client/src/components/layout/Navbar.tsx`
4. Add to sitemap in `server/routes.ts`

### Adding a New API Endpoint
1. Add route handler in `server/routes.ts`
2. Import any needed services from `server/src/services/`
3. Follow existing error handling pattern (try/catch with status/message)
4. Use `log()` function for logging API responses

### Adding Brand Logos
1. Place logo files in `public/assets/brands/homepage/` (featured) or `public/assets/brands/all/`
2. Supported formats: png, jpg, jpeg, webp, svg, gif
3. Filename will be auto-formatted for display (use kebab-case)
4. No code changes needed - API auto-scans directories

### Working with Drizzle ORM
```bash
# After modifying shared/schema.ts
npm run db:push  # Push schema changes to database

# Generate migrations (if needed)
npx drizzle-kit generate
```

### Styling Guidelines
- Tailwind CSS v4 (uses `@tailwindcss/vite` plugin)
- Custom CSS variables defined in `client/src/index.css`
- shadcn/ui components use New York variant
- Framer Motion for animations (use sparingly for performance)

## User Preferences
- Communication style: Simple, everyday language
- This is a USA-focused website (updated from UK version)
- Contact: +1 (512) 737-2956, info@tonysdelight.com, Texas, USA
