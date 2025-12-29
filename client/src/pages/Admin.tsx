import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { clearProductCache } from "@/lib/google-sheets";

const CATEGORIES = [
  "Lal Qilla Basmati",
  "Seafood",
  "Frozen Products",
  "Dry Products",
  "Imported Brands",
  "Heritage (Pulses & Grains)",
];

const HOMEPAGE_SLOTS = [
  { id: "hero-background", name: "Hero Background", description: "Main hero section background image" },
  { id: "hero-product-1", name: "Hero Product 1", description: "Featured product on hero section (left)" },
  { id: "hero-product-2", name: "Hero Product 2", description: "Featured product on hero section (center)" },
  { id: "hero-product-3", name: "Hero Product 3", description: "Featured product on hero section (right)" },
];

interface HomepageImage {
  id: string;
  slotId: string;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"products" | "homepage">("products");
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [selectedSlot, setSelectedSlot] = useState(HOMEPAGE_SLOTS[0].id);
  const [slotImageFile, setSlotImageFile] = useState<File | null>(null);
  const [slotImagePreview, setSlotImagePreview] = useState<string>("");
  const [slotTitle, setSlotTitle] = useState("");
  const [slotDescription, setSlotDescription] = useState("");
  const [slotUploading, setSlotUploading] = useState(false);
  const [slotMessage, setSlotMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [homepageImages, setHomepageImages] = useState<HomepageImage[]>([]);

  useEffect(() => {
    fetchHomepageImages();
  }, []);

  const fetchHomepageImages = async () => {
    try {
      const response = await fetch("/api/homepage-images");
      const data = await response.json();
      if (data.success) {
        setHomepageImages(data.images);
      }
    } catch (error) {
      console.error("Error fetching homepage images:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlotImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSlotImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlotImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      setMessage({ type: "error", text: "Please select an image" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string;

        const response = await fetch("/api/admin/upload-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            category,
            imageBase64,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setMessage({ type: "success", text: "Product uploaded successfully!" });
          
          clearProductCache();
          queryClient.invalidateQueries({ queryKey: ["products"] });
          queryClient.invalidateQueries({ queryKey: ["brandLogos"] });
          
          setTitle("");
          setDescription("");
          setCategory(CATEGORIES[0]);
          setImageFile(null);
          setImagePreview("");
        } else {
          setMessage({ type: "error", text: data.message || "Upload failed" });
        }

        setUploading(false);
      };
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Upload failed" 
      });
      setUploading(false);
    }
  };

  const handleSlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!slotImageFile) {
      setSlotMessage({ type: "error", text: "Please select an image" });
      return;
    }

    setSlotUploading(true);
    setSlotMessage(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(slotImageFile);
      
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string;

        const response = await fetch("/api/admin/homepage-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slotId: selectedSlot,
            imageBase64,
            title: slotTitle || null,
            description: slotDescription || null,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSlotMessage({ type: "success", text: "Homepage image uploaded successfully!" });
          
          queryClient.invalidateQueries({ queryKey: ["homepageImages"] });
          fetchHomepageImages();
          
          setSlotImageFile(null);
          setSlotImagePreview("");
          setSlotTitle("");
          setSlotDescription("");
        } else {
          setSlotMessage({ type: "error", text: data.message || "Upload failed" });
        }

        setSlotUploading(false);
      };
    } catch (error) {
      setSlotMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Upload failed" 
      });
      setSlotUploading(false);
    }
  };

  const getSlotImage = (slotId: string) => {
    return homepageImages.find(img => img.slotId === slotId);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#C9A86A]">Admin Panel</h1>
            <button
              onClick={() => setLocation("/")}
              className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
              data-testid="button-back-home"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-[#C9A86A] text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
            data-testid="tab-products"
          >
            Upload Products
          </button>
          <button
            onClick={() => setActiveTab("homepage")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "homepage"
                ? "bg-[#C9A86A] text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
            data-testid="tab-homepage"
          >
            Homepage Images
          </button>
        </div>

        {activeTab === "products" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">Upload Product</h2>
              <p className="text-neutral-600 mb-8">
                Add a new product to the catalogue. Images will be uploaded to Cloudinary, 
                and product data will be saved to Google Sheets.
              </p>

              {message && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                  data-testid={`message-${message.type}`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    placeholder="e.g., Lal Qilla Traditional Basmati Rice"
                    data-testid="input-title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    placeholder="Describe the product..."
                    data-testid="input-description"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    data-testid="select-category"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-neutral-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    data-testid="input-image"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                        data-testid="image-preview"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-[#C9A86A] hover:bg-[#B8975B] text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-upload"
                >
                  {uploading ? "Uploading..." : "Upload Product"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "homepage" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Upload Homepage Image</h2>
              <p className="text-neutral-600 mb-6">
                Upload images for specific slots on the homepage.
              </p>

              {slotMessage && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    slotMessage.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                  data-testid={`slot-message-${slotMessage.type}`}
                >
                  {slotMessage.text}
                </div>
              )}

              <form onSubmit={handleSlotSubmit} className="space-y-6">
                <div>
                  <label htmlFor="slot" className="block text-sm font-medium text-neutral-700 mb-2">
                    Image Slot
                  </label>
                  <select
                    id="slot"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    data-testid="select-slot"
                  >
                    {HOMEPAGE_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-neutral-500">
                    {HOMEPAGE_SLOTS.find(s => s.id === selectedSlot)?.description}
                  </p>
                </div>

                <div>
                  <label htmlFor="slotTitle" className="block text-sm font-medium text-neutral-700 mb-2">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    id="slotTitle"
                    value={slotTitle}
                    onChange={(e) => setSlotTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    placeholder="Optional title for this image"
                    data-testid="input-slot-title"
                  />
                </div>

                <div>
                  <label htmlFor="slotDescription" className="block text-sm font-medium text-neutral-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    id="slotDescription"
                    value={slotDescription}
                    onChange={(e) => setSlotDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    placeholder="Optional description..."
                    data-testid="input-slot-description"
                  />
                </div>

                <div>
                  <label htmlFor="slotImage" className="block text-sm font-medium text-neutral-700 mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    id="slotImage"
                    accept="image/*"
                    onChange={handleSlotImageChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    data-testid="input-slot-image"
                  />
                  {slotImagePreview && (
                    <div className="mt-4">
                      <img
                        src={slotImagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        data-testid="slot-image-preview"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={slotUploading}
                  className="w-full bg-[#C9A86A] hover:bg-[#B8975B] text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-upload-slot"
                >
                  {slotUploading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Current Homepage Images</h2>
              
              <div className="space-y-6">
                {HOMEPAGE_SLOTS.map((slot) => {
                  const currentImage = getSlotImage(slot.id);
                  return (
                    <div key={slot.id} className="border border-neutral-200 rounded-lg p-4">
                      <h3 className="font-semibold text-neutral-900 mb-1">{slot.name}</h3>
                      <p className="text-sm text-neutral-500 mb-3">{slot.description}</p>
                      {currentImage ? (
                        <div>
                          <img
                            src={currentImage.imageUrl}
                            alt={currentImage.title || slot.name}
                            className="w-full h-32 object-cover rounded-lg"
                            data-testid={`current-image-${slot.id}`}
                          />
                          {currentImage.title && (
                            <p className="mt-2 text-sm font-medium">{currentImage.title}</p>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
                          No image uploaded
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
