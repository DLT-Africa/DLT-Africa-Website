"use client"
import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Faq = ({ question, answer }) => {
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

      {isFaqShowing && <p className="text-[14px] p-[2px]">{answer}</p>}
    </div>
  );
};

export default Faq;
