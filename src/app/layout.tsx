import "./globals.css";
import { cn } from "@lasuhealth/lib/utils";
import localFont from "next/font/local";

const dmSans = localFont({
  src: [
    {
      path: "../fonts/DMSans-Regular.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/DMSans-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className={cn(dmSans.className, "antialiased")}>{children}</body>
    </html>
  );
}
