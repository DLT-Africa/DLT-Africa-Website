const HackerHouseBuild = () => {
  return (
    <>
      <div className="bg-[#031700] relative max-w-[1440px] h-[745px] md:834px flex items-center justify-center">
        <div className="z-50 flex items-center gap-[41px] pt-[97px] flex-col lg:flex-row">
          <div className="text-center text-[#F7FCFE] text-[34px] font-[500] max-w-[459px] ">
            <h2 className="mb-[15px] ">Build with the Best in Web3</h2>
            <p className="text-[17px] font-[300]  mb-[25px] lg:text-left text-center">
              Collaborate with blockchain experts, explore cutting-edge tech,
              master smart contracts, and create groundbreaking projects.
              Elevate your skills and shape the future of blockchain with us at
              Hacker House.
            </p>
            <button className="text-[#F7FCFE] bg-[#FC7C13] text-[16px] hover:bg-[#ED6109] rounded-[10px] w-[353px] h-[55px] ">
              Sign up for Hacker House
            </button>
          </div>

          <div className="div">
            <img src="/images/withthebestimg.svg" alt="suberopic" />
          </div>
        </div>

        <div className="div z-50 hidden lg:block">
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[1017px] top-[110px]"
          />
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[55px] top-[290px]"
          />
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[616px] top-[338px]"
          />
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[207px] top-[542px]"
          />
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[536px] top-[542px]"
          />
          <img
            src="/images/strokeimg.svg"
            alt="strok"
            className="absolute left-[1248px] top-[457px]"
          />
        </div>
      </div>
    </>
  );
};

export default HackerHouseBuild;
