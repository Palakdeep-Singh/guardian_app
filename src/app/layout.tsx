import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import BottomNavBar from "@/components/layout/BottomNavBar";

export const metadata: Metadata = {
  title: "Guardian Mobile",
  description: "Guardian Mobile Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-slate-100 dark:bg-slate-900 flex justify-center items-center min-h-screen">
        <div className="relative w-full max-w-lg bg-background flex flex-col shadow-2xl overflow-hidden h-[100dvh] md:h-[90vh] md:max-h-[900px] md:rounded-3xl">
          <Header />
          <main className="flex-1 overflow-y-auto pb-20">{children}</main>
          <BottomNavBar />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
