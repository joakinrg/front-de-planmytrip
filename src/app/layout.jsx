import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthProvider";
export const metadata = {
  title: "planmytrip",
  description: "Plan my Trip",
};

export default  function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
     <AuthProvider>

          <Navbar />
          {children}
          <Footer />
         
     </AuthProvider>
      </body>
    </html>
  );
}
