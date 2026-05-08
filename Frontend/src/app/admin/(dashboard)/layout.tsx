import AdminDashboardLayoutClient from "./components/AdminDashboardLayoutClient";
import ClientProviders from "@/components/ClientProviders";

export const dynamic = 'force-dynamic';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <AdminDashboardLayoutClient>{children}</AdminDashboardLayoutClient>
    </ClientProviders>
  );
}
