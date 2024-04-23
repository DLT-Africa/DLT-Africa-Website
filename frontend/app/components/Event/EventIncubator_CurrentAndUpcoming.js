import Current1 from "../../../public/Current1.png";
import Current2 from "../../../public/Current2.png";
import Current3 from "../../../public/Current3.png";
import Current4 from "../../../public/Current4.png";
import Image from "next/image";
import CurrentAndUpcoming from "../HomePage/CurrentAndUpcoming/CurrentAndUpcoming";


const EventIncubator_CurrentAndUpcoming = () => {
  return (
    <>
      <div className="hidden mb-[100px] w-full xl:w-[900px] mx-auto  md:block sm:w-full  ">
        <div className="bg-[#252A24] border border-gray-700 rounded-xl pl-[53px] pr-[110px] py-[32px]">
          <div className="flex">
            <div>
              <img
                src="/images/Frame.png"
                alt="speaker"
                className="gap-[5rem]"
              />
            </div>
            <div className="text-[#fff] inline-flex flex-col gap-15">
              <h2 className="lg:text-[48px] md:text-[36px] font-[400] font-serif text-right">
                Incubators
              </h2>
              <h4 className="lg:text-[20px] md:text-[16px] font-[400] font-Poppins opacity-75 text-left ml-[100px]">
                Learn, build and showcase your skills alongside like-minded
                peers.
              </h4>
            </div>
          </div>
        </div>
      </div>

      
      <CurrentAndUpcoming/>
    </>
  );
};

export default EventIncubator_CurrentAndUpcoming;
