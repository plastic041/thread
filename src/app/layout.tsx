import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/header";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/sonner";

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
        <body className="flex flex-col h-full bg-neutral-100">
          <Header />
          <div className="grow w-full max-w-lg mx-auto">{children}</div>
          <div className="w-full max-w-lg mx-auto">{newpost}</div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
