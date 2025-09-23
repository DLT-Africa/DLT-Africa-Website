"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
