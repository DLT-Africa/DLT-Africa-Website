"use client";
// @ts-ignore

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  currentPath: string;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DLT Africa Official Website</title>
          <meta name="description" content="DLT Africa Official Website" />

          <link rel="icon" href="/dlt.png" type="image/png" />
        </head>
        <body className={inter.className}>
          <Header />
          {children}

          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
