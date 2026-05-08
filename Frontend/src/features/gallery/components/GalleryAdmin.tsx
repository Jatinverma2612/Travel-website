"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { 
  Trash2, 
  Plus, 
  RefreshCw, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryService } from "@/services/gallery.service";
import Cropper from "react-easy-crop";

interface GalleryImage {
  id: number;
  image_url: string;
  created_at: string;
}

export const GalleryAdmin = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Crop & Upload State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAll();
      setImages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validation
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload JPG, PNG or WebP.");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result as string);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const croppedImageBlob = await getCroppedImg(selectedImage, croppedAreaPixels);
      
      const formData = new FormData();
      formData.append("image_file", croppedImageBlob, "gallery-image.jpg");

      const response = await galleryService.create(formData);

      if (response) {
        toast.success("Image added to gallery!");
        setShowCropper(false);
        setSelectedImage(null);
        setIsAdding(false);
        fetchImages();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await galleryService.delete(id);
      setImages(images.filter((img) => img.id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            Customer Gallery
          </h1>
          <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
            Manage public "Happy Customers" memories
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all font-black text-sm shadow-xl shadow-slate-900/10 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Upload New Image
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileChange} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp" 
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-32 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Loading Gallery...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-slate-100 border-dashed">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-900">No memories yet</h3>
          <p className="text-slate-500 mt-2 font-medium">Start capturing happy smiles in your gallery.</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-8 text-blue-600 font-black hover:underline"
          >
            Upload your first photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.map((img) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={img.id}
              className="group relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={img.image_url}
                alt="Gallery Image"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 hover:scale-110 transition-all shadow-xl"
                  title="Delete memory"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Crop Modal */}
      <AnimatePresence>
        {showCropper && selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUploading && setShowCropper(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
                <h2 className="text-lg font-bold text-slate-900">Crop Image</h2>
                <button
                  disabled={isUploading}
                  onClick={() => setShowCropper(false)}
                  className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cropper Area */}
              <div className="relative w-full h-[350px] bg-slate-50">
                <Cropper
                  image={selectedImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={4/5}
                  objectFit="contain"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              {/* Controls & Footer */}
              <div className="p-6 bg-white space-y-6">
                {/* Zoom Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zoom Level</span>
                    <button
                      onClick={() => setZoom(1)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <ZoomOut className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <ZoomIn className="h-4 w-4 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={isUploading}
                    onClick={() => setShowCropper(false)}
                    className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isUploading}
                    onClick={handleUpload}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    {isUploading ? "Saving..." : "Save Image"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Utility functions for image cropping
 */
async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("No 2d context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(blob);
    }, "image/jpeg", 0.9);
  });
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
