import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { DrawerProvider } from "@/components/drawer-manager";
import { DialogProvider } from "@/components/dialog-manager";
import Loader3 from "@/components/loaders/loader-3";

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lagos State University Health Centre",
  description: "A platform for LASU students to access health services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className=" scroll_hide overflow-auto [scrollbar-gutter:stable;] overscroll-contain"
    >
      <body className={`${nunito.className}`}>
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <Loader3 />
            </div>
          }
        >
          <DialogProvider>
            <DrawerProvider>{children}</DrawerProvider>
          </DialogProvider>
        </Suspense>
        <Toaster richColors position="top-right" duration={1000} />
      </body>
    </html>
  );
}
