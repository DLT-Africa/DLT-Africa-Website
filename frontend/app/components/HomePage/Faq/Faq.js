"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Faq = ({ question, answer, url, linkText }) => {
  const [isFaqShowing, setIsFaqShowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div onClick={() => setIsFaqShowing((prev) => !prev)}>
      <article className="flex justify-between ">
        <p className="text-[16px]">{question}</p>

        <button className="">
          {isFaqShowing ? (
            <RiArrowDropUpLine size={isMobile ? 20 : 25} />
          ) : (
            <RiArrowDropDownLine size={isMobile ? 20 : 25} />
          )}
        </button>
      </article>

      {isFaqShowing && (
        <p className="text-[14px] p-[2px] flex flex-row gap-1">
          {answer}

          {url && (
            <p className="text-[#fff] duration-500 ease-in-out transform hover:-translate-y-1">
              <Link href={url} className="">
                {linkText}
              </Link>{" "}
            </p>
          )}
        </p>
      )}
    </div>
  );
};

export default Faq;
