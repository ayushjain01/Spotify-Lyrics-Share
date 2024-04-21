import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Lyrics Share",
  description: "Share lyrics with custom open graph.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
