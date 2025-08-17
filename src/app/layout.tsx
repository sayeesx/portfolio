import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { GridPattern } from '@/components/grid-pattern';

// Load fonts with modern font-display: swap for better performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Portfolio | AI & Software Engineer",
  description: "Building cutting-edge AI & software solutions. I design and develop digital experiences that solve complex problems.",
  keywords: ["AI Engineer", "Software Developer", "Web Development", "Machine Learning", "Portfolio"],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    title: "Portfolio | AI & Software Engineer",
    description: "Building cutting-edge AI & software solutions. I design and develop digital experiences that solve complex problems.",
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Portfolio | AI & Software Engineer",
    description: "Building cutting-edge AI & software solutions. I design and develop digital experiences that solve complex problems.",
    creator: '@yourtwitter',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Portfolio',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body>
        {/* Ensure grid is the single background source and scrolls with content */}
        <GridPattern>
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </GridPattern>
      </body>
    </html>
  );
}
