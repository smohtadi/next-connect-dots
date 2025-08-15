import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Gluten } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gluten = Gluten({
  variable: "--font-gluten",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dots",
  description: "A fun and interactive game to connect the dots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gluten.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
