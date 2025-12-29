# Tony's Delight UK Ltd. - Setup Instructions

This document explains how to configure Google Sheets and Cloudinary for the product management system.

## Overview

The application uses:
- **Google Sheets** for product data storage (title, description, category, image URL)
- **Cloudinary** for image hosting
- **Admin Panel** at `/admin` for uploading new products

## 1. Google Sheets Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Tony's Delight Products"
4. In Row 1, add these headers:
   - Column A: `imageUrl`
   - Column B: `title`
   - Column C: `description`
   - Column D: `category`

5. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1abc123xyz/edit`
   - Your SHEET_ID is: `1abc123xyz`

### Step 2: Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable the **Google Sheets API**:
   - Navigation Menu → APIs & Services → Library
   - Search "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Navigation Menu → APIs & Services → Credentials
   - Click "Create Credentials" → "Service Account"
   - Fill in the name (e.g., "sheets-service-account")
   - Click "Create and Continue"
   - Skip optional steps, click "Done"
5. Download the JSON key file:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose JSON format
   - Download the file
6. Rename the downloaded file to `google-service-account.json`
7. Place it in `server/src/config/google-service-account.json`

### Step 3: Share the Sheet with the Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Copy the service account email from the JSON file (looks like `[name]@[project].iam.gserviceaccount.com`)
4. Paste it in the share dialog
5. Give it "Editor" permissions
6. Click "Send"

### Step 4: Set Environment Variable

Set the `GOOGLE_SHEET_ID` environment variable using the Replit Secrets tab:

```
GOOGLE_SHEET_ID=your_sheet_id_here
```

## 2. Cloudinary Setup

### Step 1: Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for a free account
3. Go to the Dashboard

### Step 2: Get Your Credentials

From the Cloudinary Dashboard, copy:
- **Cloud Name**
- **API Key**
- **API Secret**

### Step 3: Set Environment Variables

Add these to the Replit Secrets tab:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 3. Testing the Setup

1. Navigate to `/admin` in your application
2. Fill in the product form:
   - Product Title
   - Description
   - Category (select from dropdown)
   - Upload an image
3. Click "Upload Product"
4. Check your Google Sheet - a new row should appear
5. Check your Cloudinary Media Library - the image should be uploaded
6. Visit the product category page to see the new product

## 4. Product Categories

The following categories are available:
- Lal Qilla Basmati
- Seafood
- Frozen Products
- Dry Products
- Imported Brands
- Heritage (Pulses & Grains)

## 5. Troubleshooting

### Products not loading?
- Check that `GOOGLE_SHEET_ID` is set correctly
- Verify the service account has access to the sheet
- Check browser console for API errors

### Image upload failing?
- Verify Cloudinary credentials are correct
- Check that the image file size is reasonable (<10MB)
- Check server logs for detailed error messages

### "Permission denied" errors?
- Ensure the service account email is shared with the Google Sheet
- Verify the service account has "Editor" permissions

## 6. Local Development

If testing locally, you can also set the environment variable `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` to point to your JSON file:

```
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=/path/to/your/google-service-account.json
```

Otherwise, the default path is `server/src/config/google-service-account.json`.
