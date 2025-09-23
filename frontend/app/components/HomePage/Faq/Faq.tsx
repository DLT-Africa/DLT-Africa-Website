"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface FaqProps {
  question: string;
  answer: string;
  url?: string;
  linkText?: string;
}

const Faq: React.FC<FaqProps> = ({ question, answer, url, linkText }) => {
  const [isFaqShowing, setIsFaqShowing] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = (): void => {
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
        <p className="lg:text-[20px] text-[16px] font-serif">{question}</p>

        <button className="">
          {isFaqShowing ? (
            <RiArrowDropUpLine size={isMobile ? 20 : 25} />
          ) : (
            <RiArrowDropDownLine size={isMobile ? 20 : 25} />
          )}
        </button>
      </article>

      {isFaqShowing && (
        <p className="lg:text-[18px] text-[14px] p-[2px] flex flex-row gap-1 font-serif">
          {answer}

          {url && (
            <p className="text-[#fff] duration-500 ease-in-out transform hover:-translate-y-1 font-serif">
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
