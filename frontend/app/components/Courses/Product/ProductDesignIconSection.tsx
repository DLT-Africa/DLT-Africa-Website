"use client";

import React from "react";
import IconSection from "../IconSection/IconSection";
import { ImHourGlass } from "react-icons/im";
import { IoIosApps } from "react-icons/io";
import { BsListUl, BsCalendar4Event } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";

import { BsLayoutWtf } from "react-icons/bs";

const secData = [
  {
    id: 1,
    title: "Duration",
    text: "3 months",

    icon: <ImHourGlass />,
    courseConClass:
      "py-2 px-30 flex flex-row items-center justify-center gap-[30px] ",
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]",
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold",
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]",
  },
  {
    id: 2,
    title: "Date",
    text: "January 5, 2026",
    icon: <BsCalendar4Event />,
    courseConClass: " py-2 px-30 flex flex-row items-center justify-center",
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]",
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold",
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]",
  },
  {
    id: 3,
    title: "Level",
    text: "Our program doesn't require you to have any prior knowledge",
    icon: <IoIosApps />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center",
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]",
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold",
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]",
  },
  {
    id: 4,
    title: "Cost",
    text: "Our Product Design course cost sum of One hundred and Seventy thousand naira only.(#170,000)",
    icon: <CgBrowser />, // Corrected to SlCalendar
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center", // Different class for the second item
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  {
    id: 5,
    title: "Prerequisites",
    text: "All you'll need for our program is a laptop and an open mind",
    icon: <BsListUl />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center",
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]",
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold",
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]",
  },
  {
    id: 6,
    title: "Projects",
    text: "Our cohorts will be given 3 projects to test their knowledge",
    icon: <BsLayoutWtf />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center ",
    iconBodyClass:
      "sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:
      "sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]",
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold",
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]",
  },
];

const ProductDesignIconSection: React.FC = () => {
  return (
    <section className="mainCon flex justify-center pt-[84px] pb-[71px] text-center sm:px-[100px] md:px-[120px] lg:[220] bg-[#F6F6F6]">
      <div className="iconsCon sm: grid grid-cols-1 sm:gap-5 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-20 items-center justify-center">
        {secData.map(
          ({
            id,
            title,
            text,
            icon,
            courseConClass,
            iconBodyClass,
            iconsClass,
            titleClass,
            textClass,
          }) => (
            <IconSection
              key={id}
              title={title}
              text={text}
              text1=""
              icon={icon}
              courseConClass={courseConClass}
              iconBodyClass={iconBodyClass}
              iconsClass={iconsClass}
              titleClass={titleClass}
              textClass={textClass}
            />
          )
        )}
      </div>
    </section>
  );
};

export default ProductDesignIconSection;
