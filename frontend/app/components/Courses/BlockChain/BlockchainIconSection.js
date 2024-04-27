"use client"

import IconSection from "../IconSection/IconSection";
import { ImHourGlass } from "react-icons/im";
import { IoIosApps } from "react-icons/io";
import { BsListUl, BsCalendar4Event } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
//  import { SlCalender } from "react-icons/sl";;

import { BsLayoutWtf } from "react-icons/bs"; // Assuming this is a typo and should be imported as well

const secData = [
  {
    id: 1,
    title: "Duration",
    text: "3 months Changed from text to match the data Changed from text to  the data",
    //text2: "(3 times a week)", // Changed from text to text2 to match the data
    icon: <ImHourGlass />,
    courseConClass:
      "py-2 px-30 flex flex-row items-center justify-center gap-[30px] ",
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px] ", // Example class for text
  },
  { 
    id: 2,
    title: "Date",
    text: "Inview",
    icon: <BsCalendar4Event />,
    courseConClass: " py-2 px-30 flex flex-row items-center justify-center", // Different class for the second item
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  {
    id: 3,
    title: "Level",
    text: "Our program doesn't require you to have any knowledge",
    icon: <IoIosApps />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center", // Different class for the second item
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  {
    id: 4,
    title: "Cost",
    text: "Our Blockchain course is online and the amount still in review",
    icon: <CgBrowser />, // Corrected to SlCalendar
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center", // Different class for the second item
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  {
    id: 5,
    title: "Prerequisites",
    text: "All you'll needing for our program 1s a laptop and an open mind",
    icon: <BsListUl />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center", // Different class for the second item
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  {
    id: 6,
    title: "Projects",
    text: "Our cohorts will be given a lot of project to test their knowledge",
    icon: <BsLayoutWtf />,
    courseConClass: "py-2 px-30 flex flex-row items-center justify-center ", // Different class for the second item
    iconBodyClass:"sm:h-auto sm:p-2 sm:w-full md:w-[180px] md:h-[220px] lg:w-[229px] lg:h-[241px] border-2 border-[#fc7c1366] shadow-md rounded-[10px] flex p-1",
    iconsClass:"sm: text-[20px] md:text-[40px] lg:text-[65px] text-[#C54809] mb-[30px]", // Example class for icon size
    titleClass: "text-[22px] font-normal text-[#1C1C1C] font-extrabold", // Example class for title
    textClass: "text-md w-[100%] text-[#1C1C1C] mt-[10px]", // Example class for text
  },
  // Add more data objects as needed
];

const BlockchainIconSection = () => {
  return (
    <section className="mainCon flex justify-center pt-[84px] pb-[71px] text-center sm:px-[100px] md:px-[120px] lg:[220] bg-[#F6F6F6]">
      <div className="iconsCon px-5 sm:grid grid-cols-1 sm:gap-5 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-20 items-center justify-center">
        {secData.map(
          ({
            id,
            title,
            text,
            text2,
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
              text1={text2} // Passing text2 as text1 to IconSection
              icon={icon} // Pass the icon component directly
              courseConClass={courseConClass} // Pass Tailwind classes as props
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

export default BlockchainIconSection;
