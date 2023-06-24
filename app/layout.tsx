import "./globals.css";

import { Navbar, Footer } from "@/components";

export const metadata = {
  title: "Rentigo",
  description: "Discover the best cars for rent in your area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
