import Image from "next/image";
import Vector1 from "../../../public/Vector1.png"
import Vector2 from "../../../public/Vector2.png"
import DLT from "../../dlt.png"

const Confirmation = () => {
  return (
    <div className="flex justify-center items-center mt-[20px] ">
      <div className="bg-[#FFEFD4] h-[579px] w-[1013px] rounded-[20px] flex justify-center items-center relative">
        <div className="flex flex-col text-center">
          <div>
            <p className="w-[649px] flex-shrink-0 text-[#9c3910] font-serif text-[35px] font-normal leading-10 tracking-2">
              Are you sure you want to apply for this course at the specified
              fee of #570,000
            </p>
          </div>
          <div className="flex w-[649px] justify-center items-center content-center gap-x-[104px] gap-y-[70px] flex-wrap">
            <button className="flex w-[196px] h-[55px] p-10 justify-center items-center gap-10 flex-shrink-0 rounded-md bg-orange-500 text-[#F7FCFE] font-poppins text-[20px] font-medium mt-[8rem]">
              Yes
            </button>
            <button className="flex w-[196px] h-[55px] p-10 justify-center items-center gap-10 flex-shrink-0 rounded-md bg-[#ffe0c0] text-[#FC7C13] font-poppins text-[20px] font-medium mt-[8rem]">
              No
            </button>
          </div>
          <div className="absolute left-[88px] top-[444px]">
            <Image
              className="h-[67px] w-[41px]"
              src={DLT}
              alt=""
            />
          </div>
        </div>

        <div className="w-[724.48px] h-[666.52px] top-[2px] left-[2px] Border-[2px] Rotation-[56.1°] absolute">
          <Image src={Vector1} alt="Example" />
        </div>

        <div className="w-[724.48px] h-[666.52px] top-[355.17px] left-[333.69px] Border-[2px] Rotation-[-7.47°] absolute">
          <Image src={Vector2} alt="Example" />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
