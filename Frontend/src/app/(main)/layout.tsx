import MainLayoutClient from "@/components/MainLayoutClient";
import ClientProviders from "@/components/ClientProviders";

import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <Suspense fallback={null}>
        <MainLayoutClient>{children}</MainLayoutClient>
      </Suspense>
    </ClientProviders>
  );
}
