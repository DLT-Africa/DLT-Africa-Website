import Current1 from "../../../public/Current1.png";
import Current2 from "../../../public/Current2.png";
import Current3 from "../../../public/Current3.png";
import Current4 from "../../../public/Current4.png";
import Image from "next/image";
import CurrentAndUpcoming from "../HomePage/CurrentAndUpcoming/CurrentAndUpcoming";

const EventBootCamps_CurrentAndUpcoming = () => {
  return (
    <>
      <div className=" max-w-[977px] mx-auto hidden md:block md:px-[50px]">
        <div className="bg-[#FFFEFB] border border-gray-700 rounded-xl mx-auto pl-[90px] pr-[52px] py-[20px] ">
          <div className="flex justify-between gap-10  ">
            <div>
              <img src="/images/sidespeakerimg.svg" alt="speaker" />
            </div>
            <div>
              <h2 className="text-[48px] font-[400]   ">Bootcamps</h2>
              <h4 className="text-[20px] font-[400]  max-w-[529px]">
                Learn, build and showcase your skills alongside like-minded
                peers.{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <CurrentAndUpcoming />
    </>
  );
};

export default EventBootCamps_CurrentAndUpcoming;
