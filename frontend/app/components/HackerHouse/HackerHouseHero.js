import Image from "next/image";
import Group1 from "../../../public/images/Group1.png";
import Group2 from "../../../public/images/Group2.png";
import Component23 from "../../../public/hackerheroleft.svg";
import Component24 from "../../../public/hackerheroright.svg";

const HackerHouseHero = () => {
  return (
    <div className="font-serif h-[640px]  bg-[#031700] flex justify-center items-center overflow-auto lg:w-full md:w-full w-[100%]  ">
      {/* <div className="flex justify-between "> */}
      {/* <div className=" ">
          <Image
            src={Component23}
            className="lg:w-[374px] md:hidden w-[93px] mr-4 animate-blink hidden md:block "
          />
        </div> */}

      <div className="gap-[10px] sm:gap-[25px]  ">
        <h2 className="text-[#F7FCFE] text-[36px] md:text-[36px] lg:text-[48px] font-normal flex justify-center gap-[10px] lg:mt-[209px] md:mt-[103px] mb-[10px] relative">
          <Image
            src={Group1}
            className="absolute top-[1px] left-[70px] transform -translate-y-1/2"
            alt="Group 1"
          />
          Hacker House
          <Image
            src={Group2}
            className="absolute top-[1px] left-[412px] transform -translate-y-1/2"
            alt="Group 1"
          />
        </h2>

        <p className="text-[#FC7C13] text-[18px] lg:text-[20px] font-[400px] font-DM Serif Display flex justify-center lg:mb-[35px] md:mb-[25px] ">
          sponsored by [in view]
        </p>

        <div className=" mt-[25px]">
          <p1 className=" gap-[50px] text-[#F7FCFE] text-[18px] lg:text-[20px] font-[400px] flex justify-center opacity-0.75  lg:mb-[20px] md:mb-[10px]">
            Date: [in view]
            <span className=" mb-[15px] text-[18px]">Location: [in view]</span>
          </p1>
          <div className="flex flex-col lg:flex-row md:flex-row justify-center lg:gap-[20px] md:gap-[10px]">
            <button className="text-[16px] border border-[#C54809] rounded-[10px] lg:w-[355px] md:w-[250px] p-[10px] h-[55px] text-center font-poppins font-bold text-[#F7FCFE] bg-[#FC7C13] hover:bg-[#f19d53] cursor-pointer mb-4 lg:mb-0">
              Sign up for Hacker House
            </button>
            <button className="border border-[#C54809] rounded-[10px] lg:w-[196px] md:w-[178px] p-[10px] h-[55px] text-center font-poppins font-bold text-[#C54809] hover:bg-[white] cursor-pointer">
              view agenda
            </button>
          </div>
        </div>
      </div>

      {/* <div>
          <Image
            src={Component24}
            className="lg:w-[374px] md:hidden w-[93px] mr-4 animate-blink hidden md:block "
          />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default HackerHouseHero;
