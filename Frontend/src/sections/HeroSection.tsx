"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80", // Taj Mahal
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Jaipur / Hawa Mahal
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Kerala / Backwaters
  "https://i.pinimg.com/736x/09/60/43/0960431bb2c967035f858ced179f7ca6.jpg", // Varanasi / Culture
  "https://i.pinimg.com/1200x/3f/31/b8/3f31b8cc765742934869be454cfda12c.jpg", // Ladakh / Mountains
];

export function HeroSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden"
      id="hero"
    >
      {/* Background Swiper Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Pauses perfectly on hover
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('${src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 30%",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Multi-layer overlay for depth and readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-950/95 via-blue-950/70 to-blue-900/30 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 sm:left-8 z-20 flex items-center hidden sm:flex">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 sm:right-8 z-20 flex items-center hidden sm:flex">
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 z-10 pointer-events-none">
        <div className="max-w-xl sm:max-w-2xl pointer-events-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 mb-5 sm:mb-7"
          >
            <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm shadow-xl">
              <MapPin className="h-3 w-3" />
              Trusted by 10,000+ Travellers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6 drop-shadow-2xl"
          >
            Explore India
            <br />
            <span className="text-amber-400">Like Never Before</span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-base sm:text-lg text-blue-50/90 mb-8 sm:mb-10 leading-[1.8] max-w-lg drop-shadow-md font-medium"
          >
            Premium, professionally curated travel experiences across India.
            From the misty valleys of Kashmir to the sun-kissed beaches of Goa
            — we handle everything so you can simply travel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col xs:flex-row sm:flex-row gap-3"
          >
            <Link
              href="/packages"
              id="hero-explore-btn"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] group"
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              id="hero-contact-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base border border-white/25 transition-all duration-300 backdrop-blur-md hover:border-white/40 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Talk to an Expert
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/20 grid grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-sm"
          >
            {[
              { value: "50+", label: "Destinations" },
              { value: "10K+", label: "Happy Travellers" },
              { value: "15+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 leading-none mb-1 drop-shadow-md">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs text-white font-medium leading-tight shadow-black drop-shadow-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => swiperInstance?.slideToLoop(i)}
            className={`transition-all duration-300 rounded-full bg-white ${
              currentSlide === i ? "w-8 h-2.5 opacity-100" : "w-2.5 h-2.5 opacity-40 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
}
