import "./globals.css";
import { cn } from "@lasuhealth/lib/utils";
import { Inter } from "next/font/google";
const inter = Inter({ preload: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className={cn(inter.className, "antialiased")}>{children}</body>
    </html>
  );
}
