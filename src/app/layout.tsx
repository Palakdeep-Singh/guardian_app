import type { Metadata } from "next";
import { Exo_2, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { AuthProvider } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guardian Mobile",
  description: "Guardian Mobile Interface",
};

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-body",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-headline",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased flex justify-center items-center min-h-screen", exo2.variable, orbitron.variable)}>
        <AuthProvider>
          <div className="relative w-full max-w-lg bg-background flex flex-col shadow-2xl overflow-hidden h-[100dvh] md:h-[90vh] md:max-h-[900px] md:rounded-3xl border border-primary/20 shadow-primary/20">
            <Header />
            <main className="flex-1 overflow-y-auto pb-20">{children}</main>
            <BottomNavBar />
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
