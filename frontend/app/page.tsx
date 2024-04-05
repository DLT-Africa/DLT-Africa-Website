import CoursesOffered from "./components/HomePage/CoursesOffered/CoursesOffered";
import CurrentAndUpcoming from "./components/HomePage/CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./components/HomePage/Faq/Faqs";
import HeroSection from "./components/HomePage/HeroSection/HeroSection";
import JoinHackerHouse from "./components/HomePage/JoinHackerHouse/JoinHackerHouse";
import {
  RegisterOffline,
  RegisterOnline,
} from "./components/HomePage/Register/Register";
import WhatYou from "./components/HomePage/WhatYou/WhatYou";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhatYou />
      <RegisterOnline />
      <CoursesOffered />
      <JoinHackerHouse />
      <Faqs />
      <CurrentAndUpcoming />
      <RegisterOffline />
    </div>
  );
}
