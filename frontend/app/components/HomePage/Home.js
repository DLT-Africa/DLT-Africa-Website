"use client";
import { useInView } from "react-intersection-observer";

import CurrentAndUpcoming from "./CurrentAndUpcoming/CurrentAndUpcoming";
import Faqs from "./Faq/Faqs";
import HeroSection from "./HeroSection/HeroSection";
import JoinHackerHouse from "./JoinHackerHouse/JoinHackerHouse";
import RegisterOnline from "./Register/Register";
import WhatYou from "./WhatYou/WhatYou";

const IndexHome = () => {
  const [refWhatYou, inViewWhatYou] = useInView({ triggerOnce: true,});
  const [refRegisterOnline, inViewRegisterOnline] = useInView({ triggerOnce: true,});
  const [refJoinHackerHouse, inViewJoinHackerHouse] = useInView({ triggerOnce: true,});
  const [refFaqs, inViewFaqs] = useInView({ triggerOnce: true,});
  const [refCurrentAndUpcoming, inViewCurrentAndUpcoming] = useInView({ triggerOnce: true,});

  const scalingClass = "transform transition ease-out scale-0 opacity-0 delay-300 duration-[1000ms]";
  const visibleClass = "scale-100 opacity-100";


  return (
    <>
      <HeroSection ref={(el) => elementsRef.current.push(el)} className="scale-down" />
      <div ref={refWhatYou} className={`${scalingClass} ${inViewWhatYou ? visibleClass : ""}`}>
        <WhatYou />
      </div>
      <div ref={refRegisterOnline} className={`${scalingClass} ${inViewRegisterOnline ? visibleClass : ""}`}>
        <RegisterOnline />
      </div>
      <div ref={refJoinHackerHouse} className={`${scalingClass} ${inViewJoinHackerHouse ? visibleClass : ""}`}>
        <JoinHackerHouse />
      </div>
      <div ref={refFaqs} className={`${scalingClass} ${inViewFaqs ? visibleClass : ""}`}>
        <Faqs />
      </div>
      <div ref={refCurrentAndUpcoming} className={`${scalingClass} ${inViewCurrentAndUpcoming ? visibleClass : ""}`}>
        <CurrentAndUpcoming />
      </div>

    </>
  );
};

export default IndexHome;
