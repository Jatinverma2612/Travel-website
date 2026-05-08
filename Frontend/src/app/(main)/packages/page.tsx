import { PackagesList } from "@/features/packages/components/PackagesList";
import axiosInstance from "@/lib/axiosInstance";

export const metadata = {
  title: "Tour Packages | Bharat Yatra Travels",
  description: "Explore our hand-picked tour packages across India and beyond. Luxury journeys, adventure trips, and cultural experiences.",
};

// Set revalidation interval (e.g., 1 hour)
export const revalidate = 3600;

async function getPackages() {
  try {
    const res = await axiosInstance.get('/packages');
    // Backend returns { success: true, data: [...] }
    return res.data?.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch packages on server:", error);
    return [];
  }
}

export default async function PackagesPage() {
  const initialPackages = await getPackages();
  const packageArray = Array.isArray(initialPackages) ? initialPackages : [];

  return <PackagesList initialPackages={packageArray} />;
}
