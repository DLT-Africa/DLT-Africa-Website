import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"


const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "DLT Africa",
  description: "DLT Africa Official Website",
  icons: {
    icon: "/dlt.png",
  },
};

export default function RootLayout({
  children,
  currentPath
}: Readonly<{
  children: React.ReactNode;
  currentPath: string; 

}>) {


  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Header/>
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
