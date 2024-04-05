import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

const CourseDetail = ({ question, answer, list }) => {
  const [isDetails, setIsDetails] = useState(false);

  return (
    <div className=" py-[15px]">
      <div>
        <article className="flex justify-between gap-[20px] ">
          <ul>
            <li className="text-[28px] text-[700] list-disc font-Serif ">{question}</li>
          </ul>

          <button onClick={() => setIsDetails((prev) => !prev)}>
            {isDetails ? (
              <CiCircleMinus size={24} />
            ) : (
              <IoIosAddCircleOutline size={24} />
            )}
          </button>
        </article>

        {isDetails && <p className="text-[18px] text-[400] p-8">{answer}</p>}
      </div>

      
    </div>
  );
};

export default CourseDetail;
