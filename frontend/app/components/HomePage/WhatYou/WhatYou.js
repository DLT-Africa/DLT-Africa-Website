import React from "react";
import Image from "next/image";

const getDetails = [
  {
    id: 1,
    img: require("../../../../public/images/YouTube.png"),
    name: "300 hours of full-stack online curriculum",
    description:
      "Embark on a transformative journey with DLTAfrica's comprehensive Full-Stack Online Curriculum, designed to empower aspiring developers and seasoned professionals alike. ",
  },
  {
    id: 2,
    img: require("../../../../public/images/Vector.png"),
    name: "Guidance on setting up your own coding environment",
    description:
      "DLT Africa is there to give you a comprehensive guide on setting up your own coding environment. Whether you're a beginner or seasoned developer, having the right tools and environment is crucial for success. Wait no more!",
  },
  {
    id: 3,
    img: require("../../../../public/images/BarChart.png"),
    name: "A progress-oriented user interface and experience",
    description:
      "Experience software development like never before with our innovative approach to user interface and experience (UI/UX). Designed with your progress in mind, our platform offers an intuitive and conducive learning environment that keeps you engaged, motivated, and focused on your goals.",
  },
];

const WhatYou = () => {
  return (
    <div className="bg-[#EFFFE2] border-2 border-black-[#000000]">
      <div
        className="flex flex-col text-center mt-[57px] 
          
          text-[#1C1C1C] 
          lg:text-[48px]
          font-serif
          tracking-[2.52px]
          width-full
          md:text-[36px]
          text-[25px]
          "
      >
        {" "}
        Here&apos;s what you&apos;ll get
      </div>
      <p
        className="lg:text-[16px] md:text-[14px] mt-[10px] leading-[120%] 
        text-center text-[#1C1C1C] opacity-[0.75] lg:px-[369px] md:px-[180px] self-center mb-[90px] md:-w[564px] px-[25px]"
      >
        {" "}
        With DLT Africa, you gain access to an extensive curriculum spanning through Full- Stack and Smart Contract development totaling over 200 hours. Accepted cohorts have access to our thriving community as well as opportunities from our strategic partners around the globe.
      </p>

      <div className="grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-18 lg:gap-28 xl:gap-44 px-[25px] lg:px-32 pb-[61px] ">
        {getDetails.map((details) => (
          <div className="flex flex-col" key={details.id}>
            {/* <div className='lg:px-[117px]'> */}
            <Image
              className="w-[50px] mx-auto h-[50px] mb-[15px]"
              src={details.img}
            />
            {/* </div> */}

            <div className="flex flex-col items-center gap-[15px]">
              <h2
                className="text-left
                text-[#1C1C1C]
                md:text-[18px] 
                lg:text-[22px] 
                font-medium 
                leading-[120%]"
              >
                {details.name}
              </h2>

              <p className="lg:text-[16px] md:text-[14px]">
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
