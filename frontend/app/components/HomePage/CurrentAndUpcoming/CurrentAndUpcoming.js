import Image from "next/image";
import Current1 from "../../../../public/Current1.png"
import Current2 from "../../../../public/Current2.png"
import Current3 from "../../../../public/Current3.png"
import Current4 from "../../../../public/Current4.png"

const CurrentAndUpcoming = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-6xl tracking-wide mb-12 pt-[57px] ">
        Current and Upcoming Programmmes.
      </h1>

      <div className="flex justify-center gap-[40px] pb-[135px] pt-[90px] ">
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
          
          <Image
            className="h-[100px] w-[100px] rounded-full "
            src={Current1}
          />
          <div className="px-6 py-4 mt-[5px] flex flex-col justify-center items-center gap-[35px]">
            <div className=" text-center">
              <h3 className="text-center font-poppins text-[22px] font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Rorem Ipsum dolor
              </h3>
              <p className="font-poppins text-[#1c1c1c] text-[16px] font-light opacity-65 leading-relaxed p-[15px]">
                Web3 | Online
              </p>
              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>
            <button className="flex items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
        <Image
            className="h-[100px] w-[100px] rounded-full "
            src={Current2}
          />
          <div className="px-6 py-4 mt-[5px] flex flex-col justify-center items-center gap-[35px]">
            <div className=" text-center">
              <h3 className="text-center font-poppins text-[22px] font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Korem ipsum dolor
              </h3>
              <p className="font-poppins text-[#1c1c1c] text-[16px] font-light opacity-65 leading-relaxed p-[15px]">
                Web3 | Online
              </p>
              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>
            <button className="flex items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
        <Image
            className="h-[100px] w-[100px] rounded-full "
            src={Current3}
          />
          <div className="px-6 py-4 mt-[5px] flex flex-col justify-center items-center gap-[35px]">
            <div className=" text-center">
              <h3 className="text-center font-poppins text-[22px] font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Yorem ipsum dolor
              </h3>
              <p className="font-poppins text-[#1c1c1c] text-[16px] font-light opacity-65 leading-relaxed p-[15px]">
                Web3 | Online
              </p>
              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>
            <button className="flex items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
        <div className="max-w-xs shadow-lg flex flex-col items-center gap-4 p-5 rounded-lg border border-orange-300 w-[243px]">
        <Image
            className="h-[100px] w-[100px] rounded-full "
            src={Current4}
          />
          <div className="px-6 py-4 mt-[5px] flex flex-col justify-center items-center gap-[35px]">
            <div className=" text-center">
              <h3 className="text-center font-poppins text-[22px] font-semibold text-neutral-black opacity-75 w-266 w-[233px] h-[26px]">
                Horem ipsum dolor
              </h3>
              <p className="font-poppins text-[#1c1c1c] text-[16px] font-light opacity-65 leading-relaxed p-[15px]">
                Web3 | Online
              </p>
              <p className="font-poppins text-neutral-black text-[16px] font-light opacity-65 leading-relaxed">
                9/1/24 | 4 weeks
              </p>
            </div>
            <button className="flex items-center text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 font-poppins text-base font-medium leading-relaxed">
              View more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAndUpcoming;
