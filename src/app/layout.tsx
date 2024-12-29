import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/header";
import { ViewTransitions } from "next-view-transitions";

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
    <ViewTransitions>
      <html lang="en" className="h-full">
        <body className="flex flex-col h-full">
          <Header />
          <div className="grow">{children}</div>
          <div>{newpost}</div>
        </body>
      </html>
    </ViewTransitions>
  );
}
