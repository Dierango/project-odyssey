import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


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
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 p-4 text-center text-white">
          &copy; 2025 Athena
        </footer>
      </body>
    </html>
  );
}
