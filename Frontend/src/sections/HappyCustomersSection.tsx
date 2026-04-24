"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Camera } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface GalleryImage {
  id: number;
  image_url: string;
}

export function HappyCustomersSection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axiosInstance.get(`/api/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);



  return (
    <section className="py-20 sm:py-32 bg-slate-50 overflow-hidden" id="happy-customers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            Memories Made
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Our Happy Customers
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Smiles captured around the country. Join our vibrant community of travellers sharing unforgettable moments.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20 min-h-[300px]">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error || images.length === 0 ? (
          <div className="text-center py-20 min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 max-w-lg mx-auto">
            <Camera className="w-10 h-10 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No images available</h3>
            <p className="text-slate-500 mt-2 text-sm">Our gallery is currently being updated. Check back soon!</p>
          </div>
        ) : (
          <div className="-mx-4 sm:mx-0">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              speed={800}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={images.length > 3}
              breakpoints={{
                480: { slidesPerView: 2.2, spaceBetween: 16 },
                768: { slidesPerView: 3.2, spaceBetween: 20 },
                1024: { slidesPerView: 4.5, spaceBetween: 24 },
              }}
              className="px-4 pb-12 sm:px-0"
              style={{ paddingBottom: '2rem' }}
            >
              {images.map((img, i) => (
                <SwiperSlide key={img.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: (i % 6) * 0.08, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer bg-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 aspect-[4/5] sm:aspect-square flex"
                  >
                    <img
                      src={img.image_url}
                      alt={`Happy Customer ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-6">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-xs mb-2 shadow-sm border border-white/30">
                          Memory
                        </span>
                        <p className="text-white font-extrabold text-sm sm:text-base leading-tight tracking-tight drop-shadow-md">
                          Captured Journey
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </section>
  );
}
