"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/sections/HeroSection";
import { WhyChooseUsSection } from "@/sections/WhyChooseUsSection";
import { DestinationsSection } from "@/sections/DestinationsSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { FeaturedPackages } from "@/sections/FeaturedPackages";
import { HappyCustomersSection } from "@/sections/HappyCustomersSection";
import { CarRentalSection } from "@/sections/CarRentalSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <DestinationsSection />
      <ServicesSection />
      <FeaturedPackages />
      <HappyCustomersSection />
      <CarRentalSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
