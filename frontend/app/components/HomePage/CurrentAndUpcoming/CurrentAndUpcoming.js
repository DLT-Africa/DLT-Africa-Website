import Image from "next/image";
import Current1 from "../../../../public/Current1.png"
import Current2 from "../../../../public/Current2.png"
import Current3 from "../../../../public/Current3.png"
import Current4 from "../../../../public/Current4.png"

const CurrentAndUpcoming = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-[30px] mb-12 pt-[57px] xl:text-[45px] lg:text-[40px] md:text-[35px]">
        Current and Upcoming Programmmes.
      </h1>

      <div className="flex justify-center flex-wrap gap-[44px] lg:mb-[135px] md:mb-[40px] sm:mb-[67px]">
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
          <Image className="h-[100px] w-[100px] rounded-full " src={Current1} />
          <div className=" mt-[25px] pb-[31px] flex flex-col justify-center items-center">
            <div className="w-[266px]  flex flex-col gap-2 justify-center items-center">
              <h3 className="text-center font-poppins text-xl font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Rorem Ipsum dolor
              </h3>

              <p className="font-poppins text-[16px] text-sm font-light opacity-65 leading-relaxed w-[110px">
                Web3 | Online
              </p>

              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>

            <button className="flex mt-[35px] items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>

        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
          <Image className="h-[100px] w-[100px] rounded-full " src={Current2} />
          <div className=" mt-[25px] pb-[31px] flex flex-col justify-center items-center">
            <div className="w-[266px]  flex flex-col gap-2 justify-center items-center">
              <h3 className="text-center font-poppins text-xl font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Rorem Ipsum dolor
              </h3>

              <p className="font-poppins text-[16px] text-sm font-light opacity-65 leading-relaxed w-[110px">
                Web3 | Online
              </p>

              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>

            <button className="flex mt-[35px] items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>

        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
          <Image className="h-[100px] w-[100px] rounded-full " src={Current3} />
          <div className=" mt-[25px] pb-[31px] flex flex-col justify-center items-center">
            <div className="w-[266px]  flex flex-col gap-2 justify-center items-center">
              <h3 className="text-center font-poppins text-xl font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Rorem Ipsum dolor
              </h3>

              <p className="font-poppins text-[16px] text-sm font-light opacity-65 leading-relaxed w-[110px">
                Web3 | Online
              </p>

              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>

            <button className="flex mt-[35px] items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px] mb-[20px]">
          <Image className="h-[100px] w-[100px] rounded-full " src={Current4} />
          <div className=" mt-[25px] pb-[31px] flex flex-col justify-center items-center">
            <div className="w-[266px]  flex flex-col gap-2 justify-center items-center">
              <h3 className="text-center font-poppins text-xl font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Rorem Ipsum dolor
              </h3>

              <p className="font-poppins text-[16px] text-sm font-light opacity-65 leading-relaxed w-[110px">
                Web3 | Online
              </p>

              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>

            <button className="flex mt-[35px] items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAndUpcoming;
