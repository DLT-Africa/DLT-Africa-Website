import Image from "next/image";
import Working from "../../../../public/Working.png";
import Link from "next/link";

const JoinHackerHouse = () => {
  return (
    <>
      <div className=" font-serif   bg-[#f5f3f5] bg-opacity-100 py-[54px] px-[54px] ">
        <div className="mx-[50px] flex flex-row justify-between items-center pt-[101px]xcv">
          <div className="flex flex-col justify-center gap-[48px] w-[570px]  ">
            <div className=" text-[48px] font-[400px] gap-[5px] ">
              <div>
                <span className="text-[#252A24]"> Join our </span>{" "}
                <span className="text-[#FC7C13]">Hacker House </span>
              </div>
              <div className="w-[570px] text-[16px]">
                Register for our Hacker House and stand a chance of wining huge
                prices consectetur adipiscing elit. Nunc vulputate libero et
                velit interdum, ac aliquet odio mattis.
              </div>
            </div>
            <Link href="/hacker-house">
              <div className="border border-[#C54809] rounded w-[355px] p-[10px] text-[16px] text-center font-poppins font-bold text-[#C54809] hover:bg-[white] cursor-pointer">
                Read more
              </div>
            </Link>
          </div>
          <div className="">
            <Image src={Working} />
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinHackerHouse;
