"use client";

import { useEffect, useState } from "react";
import CurrentAndUpcoming from "./components/HomePage/CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./components/HomePage/Faq/Faqs";
import HeroSection from "./components/HomePage/HeroSection/HeroSection";
import JoinHackerHouse from "./components/HomePage/JoinHackerHouse/JoinHackerHouse";
import Partners from "./components/HomePage/Partners/Partners"
import {
  RegisterOffline,
  RegisterOnline,
} from "./components/HomePage/Register/Register";
import WhatYou from "./components/HomePage/WhatYou/WhatYou";
import Loader from "./components/Loader/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <HeroSection />
          <WhatYou />
          <RegisterOnline />
          <Partners/>
          <JoinHackerHouse />
          <Faqs />
          <CurrentAndUpcoming />
          {/* <RegisterOffline /> */}
        </div>
      )}
    </div>
  );
}
