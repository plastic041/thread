import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instacopy",
  description: "Basic Instagram clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
