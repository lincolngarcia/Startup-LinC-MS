import { Inter } from "next/font/google";
import ThemeProvider from "@/src/app/theme-provider";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
