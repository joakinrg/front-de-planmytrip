import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "planmytrip",
  description: "Plan my Trip",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar  />

        {children}
        <Footer />
      </body>
    </html>
  );
}
