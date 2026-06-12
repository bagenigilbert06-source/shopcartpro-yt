// lib/cloudinary.ts
/**
 * Cloudinary Image Upload Service
 * Handle product images, banners, and user uploads
 */

export interface CloudinaryUploadResponse {
  event_id: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
}

export interface ImageUploadOptions {
  folder?: string;
  tags?: string[];
  public_id?: string;
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "crop" | "thumb";
  quality?: "auto" | "best";
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(
  file: File,
  options: ImageUploadOptions = {}
): Promise<CloudinaryUploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");

    if (options.folder) {
      formData.append("folder", options.folder);
    }

    if (options.tags?.length) {
      formData.append("tags", options.tags.join(","));
    }

    if (options.public_id) {
      formData.append("public_id", options.public_id);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Upload failed");
    }

    const data: CloudinaryUploadResponse = await response.json();
    console.log("Image uploaded to Cloudinary:", data);
    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

/**
 * Get optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: "auto" | "best";
    format?: string;
  }
): string {
  const params = new URLSearchParams();

  if (options?.width) params.append("w", options.width.toString());
  if (options?.height) params.append("h", options.height.toString());
  if (options?.quality) params.append("q", options.quality);
  if (options?.format) params.append("f", options.format);

  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const queryString = params.toString();

  return `${baseUrl}${queryString ? `?${queryString}` : ""}/${publicId}`;
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const data = await response.json();
    console.log("Image deleted from Cloudinary:", data);
    return true;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
}

/**
 * Transform image URL for different use cases
 */
export function transformImageUrl(
  publicId: string,
  preset: "thumbnail" | "card" | "hero" | "product_detail"
): string {
  const transformations: Record<
    string,
    {
      width?: number;
      height?: number;
      quality?: string;
      format?: string;
    }
  > = {
    thumbnail: {
      width: 100,
      height: 100,
      crop: "fill",
      quality: "auto",
    },
    card: {
      width: 300,
      height: 300,
      crop: "fill",
      quality: "auto",
    },
    hero: {
      width: 1200,
      height: 600,
      crop: "fill",
      quality: "auto",
    },
    product_detail: {
      width: 600,
      height: 600,
      crop: "fit",
      quality: "auto",
    },
  };

  const transform = transformations[preset];
  return getOptimizedImageUrl(publicId, transform);
}

export default {
  uploadImageToCloudinary,
  getOptimizedImageUrl,
  deleteImageFromCloudinary,
  transformImageUrl,
};
