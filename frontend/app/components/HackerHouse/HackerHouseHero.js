const HackerHouseHero = () => {
  return (
    <div className="h-[640px]  bg-[#031700] flex justify-center items-center overflow-auto lg:w-full md:w-full w-[100%]  ">
      <div className="gap-[10px] sm:gap-[25px]  ">
        <h2 className="text-[#F7FCFE] text-[36px] md:text-[36px] lg:text-[48px] font-poppins flex justify-center gap-[10px] lg:mt-[209px] md:mt-[103px] mb-[10px] relative">
          Hacker House
        </h2>

        <p className="text-[#FC7C13] text-[18px] lg:text-[20px] font-[400px] font-DM Serif Display flex justify-center lg:mb-[35px] md:mb-[25px] ">
          sponsored by [in view]
        </p>

        <div className=" mt-[25px]">
          <p1 className=" gap-[50px] text-[#F7FCFE] text-[18px] lg:text-[20px] font-[400px] flex justify-center opacity-0.75  lg:mb-[20px] md:mb-[10px]">
            Date: [in view]
            <span className=" mb-[15px] text-[18px]">Location: [in view]</span>
          </p1>
          <div className="flex flex-col lg:flex-row md:flex-row justify-center lg:gap-[20px] md:gap-[10px]">
            <a
              href="https://forms.gle/ea5B6C16hif4YYtz8"
              className="text-[16px] border-[#C54809] rounded-[10px] lg:w-[355px] md:w-[250px] p-[10px] h-[55px] text-center font-poppins font-bold text-[#F7FCFE] bg-[#FC7C13] hover:bg-[#f19d53] cursor-pointer mb-4 lg:mb-0 flex items-center justify-center"
            >
              Sign up for Hacker House
            </a>
            <button
              className="border border-[#C54809] rounded-[10px] lg:w-[196px] md:w-[178px] p-[10px] h-[55px] text-center font-poppins font-bold text-[#C54809] hover:bg-[white] cursor-pointer"
              disabled
            >
              view agenda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerHouseHero;
