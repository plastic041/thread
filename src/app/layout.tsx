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
          <div className="grow w-[42rem] mx-auto">{children}</div>
          <div className="max-w-2xl mx-auto">{newpost}</div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
