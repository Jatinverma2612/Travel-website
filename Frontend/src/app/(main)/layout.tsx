import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
