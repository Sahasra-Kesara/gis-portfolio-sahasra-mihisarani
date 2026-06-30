import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "V.G. Sahasra Mihisarani | GIS Researcher",
    template: "%s | V.G. Sahasra Mihisarani",
  },
  description:
    "Professional GIS portfolio showcasing geospatial research, remote sensing projects, publications, and environmental analysis by V.G. Sahasra Mihisarani.",
  keywords: [
    "GIS",
    "Remote Sensing",
    "Geoinformatics",
    "Spatial Analysis",
    "GIS Researcher",
    "Sri Lanka",
    "Environmental Research",
    "Disaster Risk Management",
  ],
  authors: [{ name: "V.G. Sahasra Mihisarani" }],
  openGraph: {
    title: "V.G. Sahasra Mihisarani | GIS Researcher",
    description:
      "Professional GIS portfolio showcasing geospatial research, remote sensing projects, publications, and environmental analysis.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
