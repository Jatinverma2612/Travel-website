"use client";

import { HeroSection } from "@/sections/HeroSection";
import { FeaturedPackages } from "@/sections/FeaturedPackages";
import { ServicesSection } from "@/sections/ServicesSection";
import { DestinationsSection } from "@/sections/DestinationsSection";
import { WhyChooseUsSection } from "@/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";
import { HappyCustomersSection } from "@/sections/HappyCustomersSection";
import { CarRentalSection } from "@/sections/CarRentalSection";
import DelhiHero from "@/sections/DelhiHero";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <HeroSection />
      <DelhiHero />
      <FeaturedPackages />
      <ServicesSection />
      <DestinationsSection />
      <WhyChooseUsSection />
      <CarRentalSection />
      <HappyCustomersSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
