import Image from "next/image";
import Course1 from "../../../../public/Course1.png";
import Course2 from "../../../../public/Course2.png";
import Course3 from "../../../../public/Course3.png";
import Course4 from "../../../../public/Course4.png";
import Link from "next/link";

const CoursesOffered = () => {
  return (
    <div className="flex flex-col justify-end items-center gap-[90px]  border-b border-black border-opacity-30 bg-green-100 bg-opacity-45 " id="courses">
      <h1 className="text-center pt-[57px] text-black font-dm-serif-display text-[48px] font-normal leading-12 tracking-wide ">
        Courses we offer
      </h1>
      <div className="flex items-start justify-center gap-[35px] flex-wrap mb-[47px]">
        <div className="flex flex-col  w-[250px] items-center gap-4 rounded-2xl border border-orange-300 p-2">
          <Image
            className="w-[286px] h-[160px] flex-shrink-0 rounded-t-lg bg-cover bg-center bg-no-repeat"
            src={Course1}
          />

          <div className="w-[230px] flex flex-col items-center gap-[25px] ">
            <h4 className=" text-black font-poppins font-semibold text-[22px] leading-[26.4px] ">
              Full-Stack web development
            </h4>

            <p className="w-[230px] h-[57px] text-black font-poppins font-light text-[14px] leading-relaxed opacity-65 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </p>
            <Link
              href="/fullstack"
              className="flex justify-center items-center w-[230px] h-[45px] px-6 rounded-lg border border-orange-700 text-orange-700 hover:bg-orange-100 font-poppins text-base font-medium leading-relaxed "
            >
              Learn Fullstack Dev
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-[250px] p-2 items-center gap-4 rounded-2xl border border-orange-300">
          <Image
            className="w-[286px] h-[160px] flex-shrink-0 rounded-t-lg bg-cover bg-center bg-no-repeat"
            src={Course2}
          />
          <div className="w-[230px] flex flex-col items-center gap-[25px]">
            <h4 className="self-stretch text-black font-poppins font-semibold text-[22px] leading-[20.4px] ">
              Front end web development
            </h4>
            <p className="align-self-stretch text-black font-poppins font-normal text-[14px] leading-relaxed opacity-65">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </p>
            <Link
              href="/frontend"
              className="flex justify-center items-center w-[230px] h-[45px] px-6 rounded-lg border border-orange-700 text-orange-700 hover:bg-orange-100 font-poppins text-base font-medium leading-relaxed "
            >
              Learn frontend dev
            </Link>
          </div>
        </div>
        <div className="flex flex-col  w-[250px] p-2 items-center gap-4 rounded-2xl border border-orange-300">
          <Image
            className="w-[286px] h-[160px] flex-shrink-0 rounded-t-lg bg-cover bg-center bg-no-repeat"
            src={Course3}
          />
          <div className="w-[230px] flex flex-col items-center gap-[25px]">
            <h4 className="self-stretch text-black font-poppins font-semibold text-[20px] leading-[36px]">
              Product design (UI/UX)
            </h4>
            <p className="w-[230px] h-[57px] text-black font-poppins font-light text-[14px] leading-relaxed opacity-65 mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </p>
            <Link
              href="/product"
              className="flex justify-center items-center w-[230px] h-[45px] px-6 rounded-lg border border-orange-700 text-orange-700 hover:bg-orange-100 font-poppins text-base font-medium leading-relaxed "
            >
              Learn product design
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-[250px] p-2 items-center gap-4 rounded-2xl border border-orange-300">
          <Image
            className="w-[286px] h-[160px] flex-shrink-0 rounded-t-lg bg-cover bg-center bg-no-repeat"
            src={Course4}
          />
          <div className="w-[230px] flex flex-col items-center gap-[25px]">
            <h4 className="self-stretch text-black font-poppins font-semibold text-3xl leading-[26.4px] ">
              Blockchain development
            </h4>
            <p className="w-[230px] h-[57px] text-black font-poppins font-light text-[14px] leading-relaxed opacity-65">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </p>
            <Link
              href="blockchain"
              className="flex justify-center items-center w-[230px] h-[45px] px-6 rounded-lg border border-orange-700 text-orange-700 hover:bg-orange-100 font-poppins text-base font-medium leading-relaxed "
            >
              Learn blockchain dev
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesOffered;
