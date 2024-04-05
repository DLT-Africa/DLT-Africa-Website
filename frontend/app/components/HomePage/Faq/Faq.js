"use client";

import React from "react";
import { useState } from "react";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Faq = ({ question, answer }) => {
  const [isFaqShowing, setIsFaqShowing] = useState(false);

  return (
    <div onClick={() => setIsFaqShowing((prev) => !prev)}>
      <article className="flex justify-between">
        <p className="text-[16px] ">{question}</p>

        <button className="">
          {isFaqShowing ? <RiArrowDropUpLine size={25} /> : <RiArrowDropDownLine size={25} />}
        </button>
      </article>

      {isFaqShowing && <p className="text-[14px] p-[2px] ">{answer}</p>}
    </div>
  );
};

export default Faq;
