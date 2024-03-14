import CoursesOffered from "./CoursesOffered/CoursesOffered";
import CurrentAndUpcoming from "./CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./Faq/Faqs";
import HeroSection from "./HeroSection/HeroSection";
import JoinHackerHouse from "./JoinHackerHouse/JoinHackerHouse";
import { RegisterOffline, RegisterOnline } from "./Register/Register";
import WhatYou from "./WhatYou/WhatYou";

const IndexHome = () => {
  return (
    <div>
      <HeroSection />
      <WhatYou />
      <RegisterOnline />
      <CoursesOffered />
      <JoinHackerHouse />
      <Faqs/>
      <CurrentAndUpcoming />
      <RegisterOffline />
    </div>
  );
};

export default IndexHome;
