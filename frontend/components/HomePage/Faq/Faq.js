import React from "react";
import { useState } from "react";


import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const FAQ = ({ question, answer }) => {

  const [isFaqShowing, setIsFaqShowing] = useState(false);

  return (
    <div onClick={() => setIsFaqShowing((prev) => !prev)}>

      <article className="flex justify-between">

        <p>{question}</p>
        
        <button className="">
          {isFaqShowing ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </button>

      </article>

      {isFaqShowing && <p className="">{answer}</p>}

    </div>
  );
};

export default FAQ;