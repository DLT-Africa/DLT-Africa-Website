import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const CourseSection = (props) => {
  return (
    <>
      <section className="bg-[#F6F7F6] py-8">
        <div className="container mx-auto flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="px-4 lg:px-[50px]">
              <h4 className="text-3xl w-full lg:w-[275px] font-serif font-bold mb-4">
                {props.title}
              </h4>
              {props.text && (
                <p className="text-[#1C1C1C] mb-4 text-[20px] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:text-[20px] lg:w-[584px]">
                  {props.text}
                </p>
              )}
              {props.headline1 && (
                <div className="flex text-[#1C1C1C] mb-4 text-[14px] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:w-[375px]">
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
                <div className="flex text-[#1C1C1C] mb-4 text-[14px] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:text-[14px] lg:w-[275px]">
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
                <div className="flex text-[#1C1C1C] mb-4 text-[14px] font-poppins font-normal leading-[120%] text-opacity-[0.75] lg:text-[14px] lg:w-[275px]">
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

              <div className="flex flex-col lg:flex-row gap-4 py-4 lg:py-[36px]">
                <Link href="/application" legacyBehavior={true}>
                  <a className="bg-[#FC7C13] w-full lg:w-[196px] h-[55px] p-[10px] flex justify-center items-center text-white font-bold rounded-[10px] hover:bg-[#ED6109] hover:text-[#F7FCFE]">
                    Register for Offline
                  </a>
                </Link>
                <Link href="/application" legacyBehavior={true}>
                  <a className="w-full lg:w-[196px] h-[55px] p-[10px] flex justify-center items-center text-[#C54809] font-bold rounded-[10px] hover:bg-[#FFF8ED] border border-solid border-[#C54809]">
                    Register for online
                  </a>
                </Link>
              </div>
              <p className="text-gray-700">{props.headline}</p>
            </div>
          </div>

          <div className="w-full lg:w-[673px] h-[448px] pt-4 lg:pt-[88px] pb-4 lg:pb-[19px] pl-4 lg:pl-[83px] pr-4 lg:pr-[50px]">
            <img
              className="object-cover h-full w-full rounded-[20px]"
              src={props.img}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseSection;