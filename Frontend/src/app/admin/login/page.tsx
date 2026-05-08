import { LoginForm } from "@/features/auth";
import ClientProviders from "@/components/ClientProviders";

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <ClientProviders>
      <LoginForm />
    </ClientProviders>
  );
}
