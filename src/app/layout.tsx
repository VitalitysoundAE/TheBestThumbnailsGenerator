import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#8b5cf6",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Thumbnail Generator - AI-Powered YouTube Thumbnail Creator",
  description: "Create stunning YouTube thumbnails with AI. Free and Pro modes with styles, backgrounds, custom colors, fonts, viral formats, and character customization.",
  keywords: ["youtube", "thumbnail", "ai", "generator", "video", "creator", "design"],
  authors: [{ name: "Thumbnail Generator" }],
  creator: "Thumbnail Generator",
  publisher: "Thumbnail Generator",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thumbnail-generator.ai",
    title: "Thumbnail Generator - AI-Powered YouTube Thumbnail Creator",
    description: "Create stunning YouTube thumbnails with AI technology",
    siteName: "Thumbnail Generator",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Thumbnail Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thumbnail Generator",
    description: "Create stunning YouTube thumbnails with AI",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
