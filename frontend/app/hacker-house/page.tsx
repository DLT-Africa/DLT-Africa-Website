"use client";

import HackerHouseHero from "@/app/components/HackerHouse/HackerHouseHero";
import HackerHouseBuild from "@/app/components/HackerHouse/HackerHouseBuild";
import HackerHouseEventItinery from "@/app/components/HackerHouse/HackerHouseEventItinery";
import HackerHouseWorkshop from "@/app/components/HackerHouse/HackerHouseWorkshop";
import HackerHousePastEvent from "@/app/components/HackerHouse/HackerHousePastEvent";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {

    // Google Tag Manager
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-G2R8DSB4GV";
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-G2R8DSB4GV');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <HackerHouseHero />
      <HackerHouseBuild />
      <HackerHouseEventItinery />
      <HackerHouseWorkshop />
      <HackerHousePastEvent />
    </div>
  );
};

export default page;
