"use client";
import { useEffect, useRef, useState } from "react";

import CurrentAndUpcoming from "./CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./Faq/Faqs";
import HeroSection from "./HeroSection/HeroSection";
import JoinHackerHouse from "./JoinHackerHouse/JoinHackerHouse";
import { RegisterOnline } from "./Register/Register";
import WhatYou from "./WhatYou/WhatYou";
import Partners from "./Partners/Partners";

const IndexHome: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Remove animation classes - just show all sections immediately
  const visibleClass: string = "scale-100 opacity-100";

  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Only set mounted to true on client side
    if (typeof window !== "undefined") {
      setMounted(true);
      elementsRef.current = [];
    }
  }, []);

  // Always return the same structure to prevent hydration mismatch
  return (
    <div className="relative">
      <HeroSection
        ref={(el: HTMLElement | null) => {
          if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
          }
        }}
        className="scale-down"
      />
      <div className={visibleClass}>
        <WhatYou />
      </div>
      <div className={visibleClass}>
        <RegisterOnline />
      </div>
      <div className={visibleClass}>
        <Partners />
      </div>
      <div className={visibleClass}>
        <JoinHackerHouse />
      </div>
      <div className={visibleClass}>
        <Faqs />
      </div>
      <div className={visibleClass}>
        <CurrentAndUpcoming />
      </div>
    </div>
  );
};

export default IndexHome;
