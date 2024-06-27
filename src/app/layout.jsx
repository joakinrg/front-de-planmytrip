import "./globals.css";
 
export const metadata = {
  title: "planmytrip",
  description: "Plan my Trip",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  >{children}</body>
    </html>
  );
}
