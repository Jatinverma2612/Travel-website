"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Users, CheckCircle2, X, Send, Loader2, CarFront } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const fleet = [
  {
    id: 1,
    name: "Hyundai Xcent",
    category: "Small",
    capacity: "4 Seats + Driver",
    image: "https://i.pinimg.com/736x/44/e6/36/44e636253a00f697e84c9b4d2d60937b.jpg",
  },
  {
    id: 2,
    name: "Maruti Swift Dezire",
    category: "Small",
    capacity: "4 Seats + Driver",
    image: "https://i.pinimg.com/736x/87/f3/5b/87f35b8481bfbbd231a07d28e263c63c.jpg",
  },
  {
    id: 3,
    name: "Toyota Etios",
    category: "Mid Size",
    capacity: "4 Seats + Driver",
    image: "https://i.pinimg.com/1200x/2c/20/26/2c2026bc7b4644bdc639d5e4a8708ef1.jpg",
  },
  {
    id: 4,
    name: "Maruti Ertiga",
    category: "Mid Size MUV",
    capacity: "6 Seats + Driver",
    image: "https://i.pinimg.com/736x/6e/ca/65/6eca65e17d0bf4f6f617f5acb9ebe207.jpg",
  },
  {
    id: 5,
    name: "Toyota Innova",
    category: "Premium SUV",
    capacity: "6/7 Seats + Driver",
    image: "https://i.pinimg.com/1200x/f9/18/20/f91820e09c1582b53c83f1ae0744203d.jpg",
  },
  {
    id: 6,
    name: "Innova Crysta",
    category: "Premium Luxury",
    capacity: "6/7 Seats + Driver",
    image: "https://i.pinimg.com/736x/31/60/ab/3160abbbbeb164ca7156b9fe7829069d.jpg",
  },
  {
    id: 7,
    name: "Tempo Traveller",
    category: "Large Group",
    capacity: "12-25 Seats",
    image: "https://i.pinimg.com/736x/8c/51/38/8c5138bef41801381b8b3688aa86efbf.jpg",
  },
  {
    id: 8,
    name: "Volvo Bus",
    category: "Luxury Coach",
    capacity: "40+ Seats",
    image: "https://i.pinimg.com/736x/d8/cd/1b/d8cd1b162b6d858f7d2bf781cb4c6ed0.jpg",
  },
];

export function CarRentalSection() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEnquire = (carName: string) => {
    setSelectedCar(carName);
    setSubmitted(false);
  };

  const closeEnquiry = () => {
    setSelectedCar(null);
    setContactForm({ name: "", email: "", phone: "", message: "" });
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) {
      toast.error("Name and Phone are required!");
      return;
    }
    setSubmitting(true);
    try {
      await axiosInstance.post("/enquiries", {
        ...contactForm,
        subject: `Car Rental Enquiry: ${selectedCar}`,
      });
      toast.success("Enquiry Sent Successfully!");
      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to send enquiry. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="car-rental" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-l-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-2">
            <CarFront className="w-4 h-4" /> Trusted Fleet
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4 mx-auto" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Car Rental Services
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] sm:text-base max-w-2xl mx-auto leading-relaxed">
            Choose from a wide range of premium vehicles for your journey. Expert local drivers included for a hassle-free and memorable trip.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            speed={800}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="pb-12 !overflow-visible"
          >
            {fleet.map((car) => (
              <SwiperSlide key={car.id}>
                <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
                  {/* Image Block */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">{car.category}</span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{car.name}</h3>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-6">
                      <Users className="w-4 h-4 text-amber-500" />
                      {car.capacity}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleEnquire(car.name)}
                        className="w-full relative overflow-hidden bg-blue-50 text-blue-600 hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 group/btn"
                      >
                        <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <CarFront className="w-4 h-4" />
                          Enquire Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modern Enquire Modal */}
      <AnimatePresence>
        {selectedCar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEnquiry}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative pointer-events-auto overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600" />
                <button
                  onClick={closeEnquiry}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-gray-900" />
                </button>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                    <p className="text-slate-500 mb-8">We will contact you shortly about the {selectedCar}.</p>
                    <button
                      onClick={closeEnquiry}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Back to rentals
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Enquire About</h3>
                      <p className="text-blue-600 font-black text-lg bg-blue-50 w-fit px-3 py-1 rounded-lg">
                        {selectedCar}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Email Address</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Travel Details</label>
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium resize-none"
                          placeholder="Dates, pickup location, extra requests..."
                          rows={3}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 mt-4 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none"
                      >
                        {submitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>{submitting ? "Sending..." : "Submit Enquiry"}</span>
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
