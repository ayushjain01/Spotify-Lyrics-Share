import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Lyrics Share - Dynamic Open Graph Generation",
  description:
    "This project is inspired by the lyrics share feature on Spotify, which allows users to select specific excerpts from a song and share them with friends. The backend generates a custom Open Graph preview image for the selected lyrics, making it easy to share highlighted lyrics visually.",
  author: "Ayush Jain",
  openGraph: {
    title: "Lyrics Share - Dynamic Open Graph Generation",
    type: "website",
    locale: "en_IE",
    description:
    "This project is inspired by the lyrics share feature on Spotify, which allows users to select specific excerpts from a song and share them with friends. The backend generates a custom Open Graph preview image for the selected lyrics, making it easy to share highlighted lyrics visually.",
    images: [
      {
        url: "https://ibb.co/vxjV61D",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
