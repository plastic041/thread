import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thread",
  description: "Basic Instagram clone",
};

export default function RootLayout({
  newpost,
  children,
}: Readonly<{
  newpost: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <div>{newpost}</div>
      </body>
    </html>
  );
}
