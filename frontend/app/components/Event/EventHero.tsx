import React from "react";

const EventHero: React.FC = () => {
  return (
    <section className="w-[100%] flex justify-between items-center sm:flex-row flex-col bg-[#F6F6F6] sm:mb-[140px] pt-[63px] md:pt-0 md:px-[50px] px-[32px]">
      <div>
        <h1 className="text-2xl lg:text-[48px] max-w-[584px] leading mb-[16px] text-[#1C1C1C] font-serif font-[400] space-[3.36]">
          Our Programmes
        </h1>
        <p className="text-[16px] lg:text-lg max-w-[326px] md:max-w-[529px] h-[48px] font-serif font-[48px] lg:font-[400px] sm:font-[16px] text-[#1C1C1C] opacity-75">
          Learn, build and showcase your skills alongside like-minded peers.
        </p>
      </div>
      <div className="flex justify-between items-center sm:pl-[17.08px]">
        <img src="/images/side-image.png" alt="side" loading="lazy" />
      </div>
    </section>
  );
};

export default EventHero;
