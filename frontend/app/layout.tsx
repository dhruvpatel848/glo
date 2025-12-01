'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LocationSelector } from "@/components/ui/LocationSelector";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {!isAdminRoute && <Header />}
        {!isAdminRoute && <LocationSelector />}
        <div className={isAdminRoute ? '' : 'pt-20'}>
          {children}
        </div>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
      </body>
    </html>
  );
}
