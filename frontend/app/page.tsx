
import CurrentAndUpcoming from "./components/HomePage/CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./components/HomePage/Faq/Faqs";
import HeroSection from "./components/HomePage/HeroSection/HeroSection";
import JoinHackerHouse from "./components/HomePage/JoinHackerHouse/JoinHackerHouse";
import {
  RegisterOffline,
  RegisterOnline,
} from "./components/HomePage/Register/Register";
import WhatYou from "./components/HomePage/WhatYou/WhatYou";
import {Metadata} from "next"

export const metadata : Metadata = {
  title: "DLT Africa",
  description: "DLT Africa Official Website",
  icons: {
    icon: "/dlt.png",
  },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhatYou />
      <RegisterOnline />
      <JoinHackerHouse />
      <Faqs />
      <CurrentAndUpcoming />
      <RegisterOffline />
    </div>
  );
}
