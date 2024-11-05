"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

const CourseSection = (props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);

    const handlePathnameChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathnameChange);

    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row bg-[#F6F7F6] lg:gap-[83px] lg:pr-[50px] md:gap-[63px] md:justify-between ">
        <div className="lg:w-[673px] md:w-[345px] sm:w-[390px] lg:pl-[50px] lg:mt-[35px] md:px-[50px] px-[32px] mt-[30px]">
          <h4 className="lg:text-[40px] md:text-[24px] text-[30px] w-full lg:w-[404px] md:w-[187px] sm:w-[187px] font-serif font-[700] lg:mb-[14px] md:mb-[10px] sm:mt-[30px] sm:font-[700] sm:mb-[10px] leading-[120%]">
            {props.title}
          </h4>
          {props.text && (
            <p className="flex flex-wrap text-[#1C1C1C] mb-4 lg:text-[20px] md:text-[16px] sm:[12px] font-poppins lg:font-normal leading-[120%] text-opacity-[0.75] lg:w-[584px] md:w-[326px] sm:w-[326px] sm:text-[16px] mt-[10px] sm:font-[400]">
              {props.text}
            </p>
          )}
          {props.headline1 && (
            <div className="flex text-[#1C1C1C] mb-4 lg:text-[14px] md:text-[12px] md:font-[400] font-poppins font-normal lg:leading-[120%] text-opacity-[0.75] lg:w-[375px] md:w-[275px] sm:w-[275px] sm:text-[12px] sm:font-[400] sm:leading-[120%]">
              <p>
                {props.showCheckbox && (
                  <FaCheckCircle className="inline-block  mr-2 w-[16px] h-[16px] font-poppins font-normal " />
                )}{" "}
                {/* Conditionally render checkbox icon */}
              </p>
              {props.headline1}
            </div>
          )}

          {props.headline2 && (
            <div className="flex text-[#1C1C1C] mb-4 lg:text-[14px] md:text-[12px] md:font-[400] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:w-[275px] md:w-[275px] sm:w-[275px] sm:text-[12px] sm:font-[400] sm:leading-[120%]">
              <p>
                {props.showCheckbox && (
                  <FaCheckCircle className="inline-block mr-2 w-[16px] h-[16px]" />
                )}{" "}
                {/* Conditionally render checkbox icon */}
              </p>
              {props.headline2}
            </div>
          )}

          {props.headline3 && (
            <div className="flex text-[#1C1C1C] mb-4 lg:text-[14px] md:text-[12px] md:font-[400] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:w-[275px] md:w-[275px] sm:w-[275px] sm:text-[12px] sm:font-[400] sm:leading-[120%]">
              <p>
                {" "}
                {props.showCheckbox && (
                  <FaCheckCircle className="inline-block mr-2 w-[16px] h-[16px]" />
                )}{" "}
                {/* Conditionally render checkbox icon */}
              </p>
              {props.headline3}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 lg:py-[36px] ">
            {pathname === "/blockchain" ? (
              <p className="text-red-600">
                Currently Not Available!!... <br /> check back later
              </p>
            ) : (
              <Link href="/application" legacyBehavior={true}>
                <a className="bg-[#FC7C13] w-full lg:w-[196px] md:w-[196px] sm:w-[326px] h-[55px] p-[10px] flex justify-center items-center md:text-[16px] text-white font-bold rounded-[10px] hover:bg-[#ED6109] hover:text-[#F7FCFE]">
                  Register for Offline
                </a>
              </Link>
            )}

            {pathname === "/blockchain" ? (
              null
            ) : (
              <Link href="/application" legacyBehavior={true}>
                <a className="w-full lg:w-[196px] md:w-[196px] sm:w-[326px] h-[55px] p-[10px] flex justify-center items-center md:text-[16px] text-[#C54809] font-bold rounded-[10px] hover:bg-[#FFF8ED] border border-solid border-[#C54809]">
                  Register for online
                </a>
              </Link>
            )}
          </div>
          <p className="text-gray-700">{props.headline4}</p>
        </div>

        <div className="lg:mt-[88px] md:mt-[45px] px-[23px] mt-[40px]">
          <img
            className="flex flex-wrap items-center object-cover lg:h-[448px] sm:w-[345px] md:w-[750px] lg:w-full rounded-[20px]"
            src={props.img}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default CourseSection;
