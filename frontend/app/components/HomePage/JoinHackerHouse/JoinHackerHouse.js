import Image from "next/image";
import Working from "../../../../public/Working.png";
import Link from "next/link";

const JoinHackerHouse = () => {
  return (
    <div className="font-serif bg-[#f5f3f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between lg:gap-[175px]">
          <div className="w-full md:mb-8 lg:text-left text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-[28px] md:text-center lg:text-start mb-4">
              Join our <span className="text-orange-500">Hacker House</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-300  lg:mb-8 md:text-center lg:text-start">
              Register for our Hacker House program and seize the opportunity to
              win amazing prizes! By joining, you'll not only enhance your
              skills but also have the chance to win big rewards.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/hacker-house"
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 w-[353px] lg:mt-[48px] md:justify-center md:mt-[20px] mt-[20px] h-[55px] py-2 px-4 rounded-md  font-400 hover:bg-orange-100 text-orange-500 border border-orange-500 flex items-center justify-center"
              >
                Read more
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[490px] md:mb-8 mr-0 md:mr-12">
            <Image
              src={Working}
              className="w-full h-auto"
              alt="Working at Hacker House"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHackerHouse;
