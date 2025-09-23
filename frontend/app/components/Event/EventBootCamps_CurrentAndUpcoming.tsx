import CurrentAndUpcoming from "../HomePage/CurrentAndUpcoming/CurrentAndUpcoming";

const EventBootCamps_CurrentAndUpcoming: React.FC = () => {
  return (
    <>
      <div className=" max-w-[977px] mx-auto hidden md:block md:px-[50px]">
        <div className="bg-[#FFFEFB] border border-gray-700 rounded-xl mx-auto pl-[90px] pr-[52px] py-[20px] ">
          <div className="flex justify-between gap-10  ">
            <div>
              <img
                src="/images/sidespeakerimg.svg"
                alt="speaker"
                loading="lazy"
              />
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
