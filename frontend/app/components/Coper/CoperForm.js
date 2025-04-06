"use client";
import Form from './Form'


const CoperForm = () => {
  return (
    <div className="py-[99px] md:py-[103px]  flex flex-col items-center gap-[51.25px] md:gap-[74px]">
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <div className="flex gap-[35px] items-center justify-center select-none">
          <img src="/images/dltCorper.png" className="h-[115.42px] md:h-auto" loading='lazy' />
          <img src="/images/nyscLogo.png" className="h-[124.71px] md:h-auto" loading='lazy' />
        </div>
        <p className="text-[#F7FCFE] font-normal font-dmSerifDisplay text-[26px] md:text-[36px] max-w-[594px] px-1 text-center ">
        DLT Africa CodeCorps Bootcamp Registration
        </p>
      </div>

      <div className='flex items-center justify-center px-15'>
        
        <Form />
        
      </div>
      
    </div>
  );
};

export default CoperForm;
