import React from "react";

const EventHero = () => {
  return (
    <section className="flex justify-center items-center sm:flex-row flex-col bg-[#F6F6F6] sm:mb-[140px]  sm:px-[50px]">
      <div>
        <h1 className="text-2xl lg:text-[48px] max-w-[584px] leading mb-[16px] text-[#1C1C1C] font-serif font-[400] space-[3.36]">
          Our Programmes
        </h1>
        <p className="text-[16px] lg:text-lg max-w-[326px] md:max-w-[529px] h-[48px] font-popins font-[48px] lg:font-[400px] sm:font-[16px] text-[#1C1C1C] opacity-75">
          Learn, build and showcase your skills alongside like-minded peers.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img src="side-image.png" alt="side" />
      </div>
    </section>
  );
};

export default EventHero;
