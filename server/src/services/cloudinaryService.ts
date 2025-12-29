import { v2 as cloudinary } from "cloudinary";

// TODO: Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME",
  api_key: process.env.CLOUDINARY_API_KEY || "YOUR_API_KEY",
  api_secret: process.env.CLOUDINARY_API_SECRET || "YOUR_API_SECRET",
});

export async function uploadImage(base64File: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(base64File, {
      folder: "tonys-delight-products",
      resource_type: "image",
    });
    
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
