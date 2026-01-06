import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akilinova - Professional Web Solutions for Africa",
  description:
    "Expert web development and digital solutions tailored for African businesses",
  keywords: ["web development", "digital solutions", "Africa", "technology"],
  authors: [{ name: "Akilinova" }],
  openGraph: {
    title: "Akilinova - Professional Web Solutions",
    description: "Expert web development and digital solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {" "}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
