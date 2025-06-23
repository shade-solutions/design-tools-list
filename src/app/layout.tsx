import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { getDesignToolsData } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://design.30tools.com'),
  title: {
    default: "Design Tools Directory - Discover the Best Design Resources",
    template: "%s | Design Tools Directory"
  },
  description: "A comprehensive collection of design tools, icons, illustrations, mockups, and resources for designers and developers. Find the perfect tools for your next project.",
  keywords: ["design tools", "UI tools", "UX tools", "design resources", "icons", "illustrations", "mockups", "templates", "design software", "creative tools"],
  authors: [{ name: "Design Tools Directory" }],
  creator: "Design Tools Directory",
  publisher: "Design Tools Directory",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://design.30tools.com",
    title: "Design Tools Directory - Discover the Best Design Resources",
    description: "A comprehensive collection of design tools, icons, illustrations, mockups, and resources for designers and developers.",
    siteName: "Design Tools Directory",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Design Tools Directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Tools Directory - Discover the Best Design Resources",
    description: "A comprehensive collection of design tools, icons, illustrations, mockups, and resources for designers and developers.",
    images: ["/icon-512x512.png"],
    creator: "@designtools"
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/icon.svg", color: "#6366f1" }
    ]
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Design Tools",
    "application-name": "Design Tools Directory",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#6366f1"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getDesignToolsData();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://logo.clearbit.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout data={data}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
