"use client";
// @ts-ignore
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import dlt from "@/app/dlt.png";

const inter = Inter({ subsets: ["latin"] });

// Layout component to wrap around content
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
          <title>Document</title>
          <meta name="description" content="Description of your website" />

          <link
            rel="shortcut icon"
            href="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdlt.84ee470c.png&w=48&q=75"
            type="image/x-icon"
          />
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
