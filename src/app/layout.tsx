import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google"

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*<!-- Google tag (gtag.js) -->*/}
      <GoogleAnalytics gaId="G-C3NK32E2TX"/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
