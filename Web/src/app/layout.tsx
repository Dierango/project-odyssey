// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
/*import Navbar from "@/components/Navbar"; // Navbar bileşenini import et*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athena",
  description: "Yapay zeka destekli siber güvenlik uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased bg-gray-900 text-white min-h-screen flex flex-col`}
      >
        {/*<Navbar /> {/* Navbar burada kalmalı */}
        <main className="flex-grow">{children}</main>
        {/* Footer buradan kaldırıldı */}
      </body>
    </html>
  );
}