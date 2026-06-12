// components/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface ImageUploadProps {
  onImageUploaded: (imageData: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }) => void;
  folder?: string;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  onImageUploaded,
  folder = "products",
  maxSize = 5,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setLoading(true);

    try {
      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        throw new Error(`File size must be less than ${maxSize}MB`);
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file");
      }

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const result = await uploadImageToCloudinary(file, {
        folder,
        tags: [folder, "shopcart"],
      });

      // Notify parent component
      onImageUploaded({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      });

      // Reset
      setPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setPreview("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={loading}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
      >
        {preview ? (
          <div className="relative w-48 h-48 mx-auto mb-4">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l6 6m0 0l-6-6m6 6H6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600 font-semibold">Uploading...</p>
            <div className="mt-2 flex justify-center">
              <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-semibold">
              {preview ? "Change image?" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        💡 Images are automatically optimized for web
      </div>
    </div>
  );
}
