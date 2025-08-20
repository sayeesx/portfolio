import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { GridPattern } from '@/components/grid-pattern';

export const metadata = {
  title: "Muhammed Sayees",
  description: "Personal portfolio of Muhammed Sayees, showcasing projects and skills in web development and AI.",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>
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
