import React, { useState, useRef, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

interface CourseDetailProps {
  question: string;
  answer: React.ReactNode;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ question, answer }) => {
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDetails && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      return;
    }

    setMaxHeight("0px");
  }, [isDetails]);

  return (
    <div className="py-4">
      <div>
        <article className="flex justify-between items-center gap-4">
          <ul>
            <li className="text-[20px] md:text-[28px] font-semibold list-disc">
              {question}
            </li>
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
          ref={contentRef}
          style={{
            maxHeight: maxHeight,
            opacity: isDetails ? 1 : 0,
          }}
          className={`text-base md:text-[15px] overflow-hidden transition-all duration-700 ease-in-out`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
