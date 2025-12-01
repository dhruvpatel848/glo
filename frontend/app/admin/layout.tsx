import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - GloCar",
  description: "GloCar Admin Panel",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
