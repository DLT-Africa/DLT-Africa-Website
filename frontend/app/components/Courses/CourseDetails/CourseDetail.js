import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

const CourseDetail = ({ question, answer, list }) => {
  const [isDetails, setIsDetails] = useState(false);

  return (
    <div className="py-4">
      <div>
        <article className="flex justify-between items-center gap-4">
          <ul>
            <li className="text-lg font-semibold list-disc">{question}</li>
          </ul>

          <button onClick={() => setIsDetails((prev) => !prev)}>
            {isDetails ? (
              <CiCircleMinus size={24} />
            ) : (
              <IoIosAddCircleOutline size={24} />
            )}
          </button>
        </article>

        <div
          className={`text-base overflow-hidden transition-height duration-300 ease-out ${
            isDetails ? "h-auto" : "h-0"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
