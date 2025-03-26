"use client";


import GraphicDesignHero from "@/app/components/Courses/Graphics/GraphicDesignHero";
import GraphicDesignIconSection from "@/app/components/Courses/Graphics/GraphicDesignIconSection";
import GraphicDesignDetail from "@/app/components/Courses/Graphics/GraphicDesignDetail";


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
      <GraphicDesignHero />
      <GraphicDesignIconSection />
      <GraphicDesignDetail />
    </div>
  );
};

export default page;
