"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    // Routes where Header and Footer should NOT be shown
    const hideHeaderFooterRoutes = ["/"];

    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(pathname);

    return (
        <>
            {!shouldHideHeaderFooter && <Header />}
            {children}
            {!shouldHideHeaderFooter && <Footer />}
        </>
    );
}


