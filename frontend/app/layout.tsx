"use client";
// @ts-ignore

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import dlt from "@/app/dlt.png";
import ScrollToTop from "@/app/components/ScrollToTop";

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

          <link
            rel="shortcut icon"
            href="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdlt.84ee470c.png&w=48&q=75"
            type="image/x-icon"
          />
        </head>
        <body className={inter.className}>
          {/* <ScrollToTop> */}
            <Header />
            {children}

            <Footer />
          {/* </ScrollToTop> */}
        </body>
      </ThemeProvider>
    </html>
  );
}
