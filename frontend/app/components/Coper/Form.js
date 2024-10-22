"use client";

import { useState } from "react";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <form className="flex flex-col gap-[24px] bg-[#FFEFD4] px-[39px] rounded-[20px] py-[80px] md:px-[56px] md:py-[91px] xl:px-[86px] max-w-[889px] text-[#1c1c1c]">
      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="fullName" className="font-poppins text-[14px] font-normal">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Alexander Wong"
            id="fullName"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="email" className="font-poppins text-[14px] font-normal">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Wong@example.com"
            id="email"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phoneNumber" className="font-poppins text-[14px] font-normal">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="08122222221"
            id="phoneNumber"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="gender" className="font-poppins text-[14px] font-normal">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="stateOfOrigin" className="font-poppins text-[14px] font-normal">
            State of origin
          </label>
          <input
            type="text"
            name="stateOfOrigin"
            placeholder="Lagos"
            id="stateOfOrigin"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[8px] text-[#1C1C1C] border-b-[1px] border-b-[#1C1C1C] ">
          <label htmlFor="corpId" className="font-poppins text-[14px] font-normal">
            Corp member ID
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              name="corpId"
              id="corpId"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="corpId"
              className=" bg-[#FC7C13] py-1 px-4 text-[14px] rounded cursor-pointer"
            >
              Upload ID
            </label>
            <span className="text-[14px] font-body font-normal ">
              {selectedFile ? selectedFile : "No file selected"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="coursesForCopers" className="font-poppins text-[14px] font-normal">
          Courses for copers
          </label>
          <select
            name="coursesForCopers"
            id="coursesForCopers"
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Web Start Essentials</option>
          </select>
        </div>
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="resumptionBatch" className="font-poppins text-[14px] font-normal">
            Resumption batch
          </label>
          <select
            name="resumptionBatch"
            id="resumptionBatch"
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>November 2024 Entry</option>
          </select>
        </div>
      </div>


      <div className="flex items-center justify-center">
        <button className="py-[18px] px-[65px] text-center bg-[#FC7C13] rounded-xl text-[16px] font-poppins font-medium text-[#F7FCFE]">Register</button>
      </div>

      
    </form>
  );
};

export default Form;
