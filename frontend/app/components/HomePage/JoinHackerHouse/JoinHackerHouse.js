import Image from "next/image";
import Working from "../../../../public/Working.png";
import Link from "next/link";

const JoinHackerHouse = () => {
  return (
    <div className="font-serif bg-[#f5f3f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 ">
        <div className="flex flex-col-reverse md:flex-col-reverse  lg:flex-row md items-center justify-between lg:gap-[175px]">
          <div className="w-full  md:mb-[39px] lg:text-left text-center ">
            <h2 className="text-2xl md:text-[36px] lg:text-[48px] text-[28px] text-gray-800 font-400 md:text-center lg:text-start mb-4">
              Join our <span className="text-orange-500">Hacker House</span>
            </h2>
            <p className="text-base md:text-[14px] lg:text-[16px] font-300 md:w-full w-[full]  lg:h-[57px] md:h-[34px] text-gray-600 lg:mb-[48px] md:mb-[20px] md:text-center text-center lg:text-start ">
              Register for our Hacker House and stand a chance of wining huge
              prices consectetur adipiscing elit. Nunc vulputate libero et velit
              interdum, ac aliquet odio mattis.
            </p>

            <div className="flex justify-center lg:justify-start ">
              <button className="w-[353px] lg:mt-[48px] md:justify-center md:mt-[20px] mt-[20px] h-[55px] py-2 px-4 rounded-md  font-400 hover:bg-white text-orange-500 border border-orange-500">
                Read more
              </button>
            </div>
          </div>

          <div className="lg:w-full md:w-[490px] md:mb-[39px]  mr-0 md:mr-12 mb-8">
            <Image
              src={Working}
              className="w-full h-auto"
              alt="Working at Hacker House"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHackerHouse;
