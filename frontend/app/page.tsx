"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CurrentAndUpcoming from "./components/HomePage/CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./components/HomePage/Faq/Faqs";
import JoinHackerHouse from "./components/HomePage/JoinHackerHouse/JoinHackerHouse";
import Partners from "./components/HomePage/Partners/Partners";
import { RegisterOnline } from "./components/HomePage/Register/Register";
import WhatYou from "./components/HomePage/WhatYou/WhatYou";
import Loader from "./components/Loader/Loader";
import IndexHome from "@/app/components/HomePage/Home"

const HeroSection = dynamic(
  () => import("./components/HomePage/HeroSection/HeroSection"),
  { ssr: false }
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    // Load Google Tag Manager scripts
    const addGoogleTagManager = () => {
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
    };

    const removeScripts = addGoogleTagManager();

    return () => {
      clearTimeout(loadTimeout);
      removeScripts();
    };
  }, []);

  return (
    <div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <IndexHome />
        </>
      )}
    </div>
  );
}
