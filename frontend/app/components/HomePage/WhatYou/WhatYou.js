import React from "react";
import Image from "next/image";

const getDetails = [
  {
    id: 1,
    img: require("../../../../public/images/YouTube.png"),
    name: "500 hours of full-stack online curriculum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: 2,
    img: require("../../../../public/images/Vector.png"),
    name: "Guidance on setting up your own coding environment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: 3,
    img: require("../../../../public/images/BarChart.png"),
    name: "A progress-oriented user interface and experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
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
        text-center text-[#1C1C1C] opacity-[0.75] lg:px-[369px] md:px-[180px] self-center   mb-[90px] md:-w[564px] "
      >
        {" "}
        With DLT Africa, you gain complimentary access to the complete 24-Week
        Online Full-Time Bootcamp curriculum from DLT Africa, totaling over 500
        hours of material! This extensive program has successfully placed
        thousands of individuals in lucrative software development positions.
      </p>

      <div className="grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-18 lg:gap-28 xl:gap-44 px-14 lg:px-32 pb-[61px] ">
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
