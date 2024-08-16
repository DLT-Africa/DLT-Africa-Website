"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CurrentAndUpcoming from "./components/HomePage/CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./components/HomePage/Faq/Faqs";
import JoinHackerHouse from "./components/HomePage/JoinHackerHouse/JoinHackerHouse";
import Partners from "./components/HomePage/Partners/Partners";
import { RegisterOnline } from "./components/HomePage/Register/Register";
import WhatYou from "./components/HomePage/WhatYou/WhatYou";
import Loader from "./components/Loader/Loader";

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
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  return (
    <div>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G2R8DSB4GV"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G2R8DSB4GV');
            `,
          }}
        />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <HeroSection />
          <WhatYou />
          <RegisterOnline />
          <Partners />
          <JoinHackerHouse />
          <Faqs />
          <CurrentAndUpcoming />
        </div>
      )}
    </div>
  );
}
