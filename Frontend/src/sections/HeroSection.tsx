"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import AnimatedCounter from "@/components/AnimatedCounter";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80",
    title: "Explore India",
    highlight: "Like Never Before",
    description: "Premium, professionally curated travel experiences across India. From the misty valleys of Kashmir to the sun-kissed beaches of Goa — we handle everything so you can simply travel.",
  },
  {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Discover Royal",
    highlight: "Heritage & Palaces",
    description: "Step into the era of kings and queens. Experience magnificent forts, vibrant culture, and unparalleled luxury in the land of royals.",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Unwind in the",
    highlight: "Serene Backwaters",
    description: "Sail through the tranquil backwaters in traditional houseboats. A perfect getaway for peace, nature, and rejuvenation.",
  },
  {
    image: "https://i.pinimg.com/736x/09/60/43/0960431bb2c967035f858ced179f7ca6.jpg",
    title: "Experience the",
    highlight: "Spiritual Essence",
    description: "Witness the divine Ganga Aarti and immerse yourself in the rich spiritual heritage of the oldest living city in the world.",
  },
  {
    image: "https://i.pinimg.com/1200x/3f/31/b8/3f31b8cc765742934869be454cfda12c.jpg",
    title: "Adventure in the",
    highlight: "Majestic Himalayas",
    description: "Embark on an unforgettable journey through the rugged terrains, crystal-clear lakes, and breathtaking mountainous landscapes.",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Escape to the",
    highlight: "Snowy Peaks",
    description: "Find your perfect winter wonderland. Enjoy thrilling adventures, cozy stays, and panoramic views of the snow-capped mountains.",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1769868012862-bc90889c9583?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Relax on the",
    highlight: "Pristine Beaches",
    description: "Soak in the sun, walk along golden sands, and dive into crystal-clear waters. The ultimate tropical coastal getaway awaits you.",
  }
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
          speed={1200}
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
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: currentSlide === index ? 1.1 : 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="w-full h-full brightness-[1.05] contrast-[1.05]"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 30%",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Clean overlay for maximum image clarity and text readability */}
      <div className="absolute inset-0 z-0 bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-24 z-10 pointer-events-none">
        <div className="max-w-xl sm:max-w-2xl pointer-events-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-5 sm:mb-7"
          >
            <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm shadow-xl">
              <MapPin className="h-3 w-3" />
              Trusted by 10,000+ Travellers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6 drop-shadow-2xl"
          >
            {slides[currentSlide]?.title}
            <br />
            <span className="text-amber-400">{slides[currentSlide]?.highlight}</span>
          </motion.h1>
 
          {/* Sub text */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-blue-50/90 mb-8 sm:mb-10 leading-[1.8] max-w-lg drop-shadow-md font-medium"
          >
            {slides[currentSlide]?.description}
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              type: "spring", 
              stiffness: 100, 
              damping: 20 
            }}
            className="flex flex-col xs:flex-row sm:flex-row gap-4"
          >
            <Link
              href="/packages"
              id="hero-explore-btn"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 text-amber-950 hover:bg-blue-600 hover:text-white font-bold px-8 py-4 rounded-xl text-sm sm:text-base transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/30 hover:scale-[1.05] active:scale-[0.95] group"
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              id="hero-contact-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white hover:text-black text-white font-semibold px-8 py-4 rounded-xl text-sm sm:text-base border border-white/25 backdrop-blur-md shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-500"
            >
              Talk to an Expert
            </Link>
          </motion.div>
 
          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.7, 
              type: "spring", 
              stiffness: 80, 
              damping: 15 
            }}
            className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/20 grid grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-sm pointer-events-auto"
          >
            {[
              { value: 50, label: "Destinations", suffix: "+" },
              { value: 10, label: "Happy Travellers", suffix: "K+" },
              { value: 15, label: "Years Experience", suffix: "+" },
            ].map((s) => (
              <div key={s.label} className="text-center group/stat">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 leading-none mb-1 drop-shadow-md group-hover/stat:scale-110 transition-transform duration-500">
                  <AnimatedCounter to={s.value} suffix={s.suffix} duration={2.5} />
                </p>
                <p className="text-[10px] sm:text-xs text-white font-medium leading-tight shadow-black drop-shadow-sm opacity-80 group-hover/stat:opacity-100 transition-opacity">{s.label}</p>
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
