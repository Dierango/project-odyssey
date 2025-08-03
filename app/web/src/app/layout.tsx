// app/layout.tsx
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import { UserProvider } from "@/contexts/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <UserProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}