import { CarRentalSection } from "@/sections/CarRentalSection";

export default function CarRentalPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pt-[66px]">
      <div className="flex-1">
        <CarRentalSection />
      </div>

      <section className="py-16 bg-blue-600 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Need a Custom Vehicle Arrangement?</h3>
        <p className="text-blue-100 max-w-xl mx-auto mb-8">
          If you are traveling with a massive group or need a specific luxury vehicle not listed above, 
          please contact our support desk. We can arrange specialty transport across anywhere in India.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-white text-blue-600 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Contact Support Desk
        </a>
      </section>
    </main>
  );
}
