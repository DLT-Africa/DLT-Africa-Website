"use client";
import { useEffect, useState } from "react";
import TalentPool from "../components/TalentPool/TalentPool";
import TalentPoolLoader from "@/app/components/Loader/TalentPoolLoader";

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    // Move the function definition inside useEffect
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

  return <div>{loading ? <TalentPoolLoader /> : <TalentPool />}</div>;
};

export default page;
