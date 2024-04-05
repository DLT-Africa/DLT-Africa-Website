import Image from "next/image";
import Group1 from "../../../public/images/Group1.png";
import Group2 from "../../../public/images/Group2.png";
import Component23 from "../../../public/images/Component23.png";
import Component24 from "../../../public/images/Component24.png";
import Component242 from "../../../public/images/Component242.png";
import Component27 from "../../../public/images/Component27.png";
import Component28 from "../../../public/images/Component28.png";
import Component282 from "../../../public/images/Component282.png";
const HackerHouseHero = () => {
  return (
    <>
      <div className=" font-serif Max-w-[1440px] h-[640px] bg-[#031700] flex-wrap justify-end overflow-[hidden]">
        <div className="">
          <Image className="absolute top-[260px] left-[482px]  " src={Group1} />
          <Image src={Group2} className="absolute top-[260px] left-[850px] " />
        </div>
        <h2 className="text-[#F7FCFE] text-[48px] font-[400px] flex justify-center pt-[209px] gap-[10px] ">
          Hacker House
        </h2>

        <p className="text-[#FC7C13] text-[20px] font-[400px] flex justify-center">
          sponsored by Lisk
        </p>
        <div className="">
          <p1 className="text-[#F7FCFE] text-[20px] font-[400px] flex justify-center opacity-0.75 Row-gaps-[40px] mb-5">
            Date: mattis Location: mattismattis
          </p1>
        </div>
        <div className="flex flex-row justify-center gap-20 ">
          <div className="text-[16px] border border-[#C54809] rounded-[10px] w-[355px] p-[10px] h-[55px] flex items-center justify-center font-poppins font-bold text-[#F7FCFE] bg-[#FC7C13] hover:bg-[#f19d53] cursor-pointer ">
            Sign up for Hacker House
          </div>
          <button className="border border-[#C54809] rounded-[10px] w-[196px] p-[10px] h-[55px] text-center font-poppins font-bold text-[#C54809] hover:bg-[white] cursor-pointer ">
            view agenda
          </button>
        </div>
        <div className=" ">
          <Image
            src={Component23}
            className="absolute top-[70px] left-[-94] "
          />
          <Image
            src={Component24}
            className="absolute top-[390px] left-[62px]"
          />
          <Image
            src={Component242}
            className="absolute top-[597px] left-[247px]"
          />
          <Image
            src={Component27}
            className="absolute top-[72px] left-[1200px]"
          />
          <Image
            src={Component28}
            className="absolute top-[429px] right-[62.7px]"
          />
          <Image
            src={Component282}
            className="absolute top-[597px] right-[245.7px]"
          />
        </div>
      </div>
    </>
  );
};

export default HackerHouseHero;
