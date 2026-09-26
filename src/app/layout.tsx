import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Oswald } from "next/font/google";

import "./globals.css";

import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { FitLogProvider } from "@/components/providers/FitLogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${oswald.variable}
        h-full
        antialiased
      `}
    >
      <body className="flex min-h-full flex-col bg-[#0b0c0f]">
        <FitLogProvider>
          <NavBar />
          {children}
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
