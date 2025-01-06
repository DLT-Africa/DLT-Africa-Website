"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "../../../json-data/color-render.json";
import { useEffect, useState } from "react";
import ContactModal from "@/app/components/HomePage/HeroSection/ContactModal";

const HeroSection = () => {
  if (typeof document !== "undefined") {
    // Your code that uses `document`
    console.log(document.title);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);



  return (
    <div className="flex flex-col-reverse md:flex-row bg-[#F6F7F6] lg:gap-[30px] md:gap-[22.76px]  p-[30px] 2xl:px-[60px] items-center justify-between  min-h-[657px] relative">
      <div className="lg:w-[500px] mt-[30px] md:mt-0 md:w-[369px]  xl:w-[800px]  2xl:w-[800px] flex flex-col md:justify-center  ">
        <h2 className="text-[#1C1C1C] text-4xl md:text-center lg:text-left lg:text-5xl 2xl:text-7xl md:text-[36px]  leading-[120%] tracking-[3.36px] font-serif">
          We build top talents,{" "}
          <span className="text-[#FC7C13] lg:text-5xl md:text-[36px] 2xl:text-7xl  tracking-[3.36px] font-serif">
            To bring top projects to life.
          </span>
        </h2>
        {/* <h2 className="text-[#1C1C1C] text-4xl md:text-center lg:text-left lg:text-5xl 2xl:text-7xl md:text-[36px]  leading-[120%] tracking-[3.36px] font-serif">
          Change your career,{" "}
          <span className="text-[#FC7C13] lg:text-5xl md:text-[36px] 2xl:text-7xl  tracking-[3.36px] font-serif">
            change your life.
          </span>
        </h2> */}

        <p className="lg:w-[347px] 2xl:w-full md:w-[326px] mt-[15px] lg:text-[20px] 2xl:text-3xl md:text-[16px] font-Poppins text-[#1C1C1C] leading-[120%] text-opacity-[0.75]">
          Our studio trains top talents across different technical skillset to
          support top global founders in bringing their projects to life.
        </p>
        {/* <p className="lg:w-[347px] 2xl:w-full md:w-[326px] mt-[15px] lg:text-[20px] 2xl:text-3xl md:text-[16px] font-Poppins text-[#1C1C1C] leading-[120%] text-opacity-[0.75]">
          Our bootcamp is designed to help people with little to no coding
          experience become high-earning software engineers.
        </p> */}

        <button
          className="bg-[#FC7C13] p-[10px] 
            flex mt-[15px] w-[100%] h-[55px] 
            rounded-[10px] items-center 
            justify-center text-[#F7FCFE]
            text-[16px]
            font-Poppins
            font-medium
            transition duration-500 ease-in-out transform hover:-translate-y-1 lg:w-[195px] "
          onClick={openModal}
        >
          Contact Us
        </button>
        {/* <Link
          className="bg-[#FC7C13] p-[10px] 
            flex mt-[15px] w-[100%] h-[55px] 
            rounded-[10px] items-center 
            justify-center text-[#F7FCFE]
            text-[16px]
            font-Poppins
            font-medium
            transition duration-500 ease-in-out transform hover:-translate-y-1 lg:w-[195px] "
          href="/courses"
        >
          Browse Courses
        </Link> */}
      </div>

      <div className="flex">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {isModalOpen && <ContactModal onClose={closeModal}   />}
    </div>
  );
};

export default HeroSection;
