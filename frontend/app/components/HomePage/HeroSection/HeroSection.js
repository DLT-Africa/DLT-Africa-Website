import Image from "next/image";
import HeroImage from "../../../../public/images/hero-img.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row bg-[#F6F7F6] lg:gap-[30px] md:gap-[22.76px] gap-[20px]">
      <div className="lg:w-[448px] md:w-[369px] sm:w-[380px] pl-[50px] lg:mt-[150px] md:mt-[99px] mt-[100px]">
        <h2 className="text-[#1C1C1C] lg:text-[48px] md:text-[36px] sm:text-[28px] leading-[120%] tracking-[3.36px] font-serif">
          Change your career,
          <span className="text-[#FC7C13] lg:text-[48px] md:text-[36px] tracking-[3.36px] font-serif">
            change your life.
          </span>
        </h2>

        <p className="lg:w-[347px] md:w-[326px] mt-[15px] lg:text-[20px] md:text-[16px] font-Poppins text-[#1C1C1C] leading-[120%] text-opacity-[0.75]">
          Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>

        <Link
          className="bg-[#FC7C13] p-[10px] 
            flex mt-[15px] w-[195px] h-[55px] 
            rounded-[10px] items-center 
            justify-center text-[#F7FCFE]
            text-[16px]
            font-Poppins
            font-medium
            md:mb-[90px]
            mb-[38px] transition duration-500 ease-in-out transform hover:-translate-y-1 "
          href="/courses"
        >
          Browse Courses
        </Link>
      </div>

      <div className="flex">
        <Image
          className="lg:w-[951px] md:w-[563px] lg:h-[824px] md:h-[523px] flex items-center justify-center"
          src={HeroImage}
        />
      </div>
    </div>
  );
};

export default HeroSection;
