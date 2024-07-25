import React from 'react'

const TalentPool = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-[85px] mb-[60px]">
        <h2 className='text-[#441606] lg:w-[400px] text-[36px] leading-[60%] mb-4'>DLT Africa Talent Pool</h2>
        <div className="flex space-x-[23px] pl-[64px] pr-[500px] pt-[61px]">
          <div className="flex items-center text-[16px] px-[10px] py-1 border-2 border-[#1E9500]">
            <input type="radio" name="role" className="mr-[4px] form-radio text-[#1E9500]" />
            <span className='text-[16px] text-[#1E9500] whitespace-nowrap'>Frontend Devs</span>
          </div>
          <div className="flex items-center text-[16px] px-3 py-1 border-2 border-[#C54809]">
            <input type="radio" name="role" className="mr-[4px]" />
            <span className='text-[16px] text-[#C54809] whitespace-nowrap'>Blockchain Devs</span>
          </div>
          <div className="flex items-center text-[16px] px-3 py-1 border-2 border-[#1E9500]">
            <input type="radio" name="role" className="mr-[4px]" />
            <span className='text-[16px] text-[#1E9500] whitespace-nowrap'>UI/UX Designers</span>
          </div>
          <div className="flex items-center text-[16px] px-[10px] py-1 border-2 border-[#C54809]">
            <input type="radio" name="role" className="mr-[4px]" />
            <span className='text-[16px] text-[#C54809] whitespace-nowrap'>Backend Devs</span>
          </div>
        </div>
      </div>
    );
  }
  
export default TalentPool;
  
  