"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Routes where Header and Footer should NOT be shown
  const hideHeaderFooterRoutes: string[] = ["/"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}
