import React from "react";
import Image from "next/image";

interface DetailItem {
  id: number;
  img: string;
  name: string;
  description: string;
}

const getDetails: DetailItem[] = [
  {
    id: 1,
    img: "/images/YouTube.png",
    name: "300 hours of extensive training",
    description:
      "Embark on a transformative journey with DLTAfrica's comprehensive Full-Stack  Curriculum, designed to empower aspiring developers and seasoned professionals alike. ",
  },
  {
    id: 2,
    img: "/images/Vector.png",
    name: "Guidance on setting up your own coding environment",
    description:
      "DLT Africa offers comprehensive technical support before, during and after product launch. We have the burden of building product away from non-technical founders to allow them focus on building the business!",
  },
  {
    id: 3,
    img: "/images/BarChart.png",
    name: "A progress-oriented user interface and experience",
    description:
      "Our post product launch support includes regular implementation of user request and 24/7 dedicated developers support for all projects in our portfolio.",
  },
];

const WhatYou: React.FC = () => {
  return (
    <div className="bg-[#EFFFE2] border-2 border-black-[#000000]">
      <div
        className="flex flex-col text-center mt-[57px] 
          
          text-[#1C1C1C] 
          lg:text-[48px]
          font-serif
          tracking-[1px]
          width-full
          md:text-[36px]
          text-[30px]
          font-bold"
      >
        {" "}
        Here&apos;s what you&apos;ll get
      </div>
      <p
        className="lg:text-[25px] md:text-[14px] mt-[10px] leading-[120%] 
        text-center text-[#1C1C1C] opacity-[0.75] lg:px-[250px] md:px-[180px] self-center mb-[90px] md:-w[564px] px-[25px] font-serif"
      >
        {" "}
        With DLT Africa, top talents gain access to extensive training spanning
        through full-stack and smart contract development. Top projects receive
        all needed technical support in building their projects to allow them
        focus on the business side of the project through our exceptional
        in-house engineers.
      </p>

      <div className="grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-12 lg:gap-12 xl:gap-12 px-[25px] lg:px-32 pb-[61px] ">
        {getDetails.map((details: DetailItem) => (
          <div className="flex flex-col" key={details.id}>
            <img
              className="w-[50px] mx-auto h-[50px] mb-[15px]"
              src={details.img}
              loading="lazy"
              alt={details.name}
            />

            <div className="flex flex-col items-center gap-[15px]">
              <h2
                className="
                text-[#1C1C1C]
                md:text-[18px] 
                lg:text-[22px] 
                text-[20px]
                font-medium 
                leading-[120%]
                text-center
                px-[10px]"
              >
                {details.name}
              </h2>

              <p className="lg:text-[20px] md:text-[14px] font-serif font-light">
                {details.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYou;
