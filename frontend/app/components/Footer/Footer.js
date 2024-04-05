"use client";
import Image from "next/image";
import DLT from "../../../public/dlt-logo.png";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-[#EFFFE2] flex flex-col items-left justify-start text-[18px]  ">
      <div className=" flex flex-row  gap-[82px] pt-[75px]  ">
        <div className=" h-[80px] flex flex-col items-center ">
          <div className="flex flex-col gap-[15px]  w-[211px] justify-center items-center ml-[50px] ">
            <a href="/">
              {" "}
              <Image src={DLT} alt="logo" className="w-[126px] h-[50.797px] " />
            </a>

            <p className="text-neutral-black font-poppins text-[16px]  font-normal leading-[120%] w-[211px] h-[19px] text-center">
              Innovating Through web3...
            </p>
          </div>
        </div>

        <div className="  inline-flex items-start gap-[50px]  ">
          <div className=" h-[123px]">
            <h1 className=" text-[#C54809] font-sans font-bold leading-normal text-[24px]">
              Our Mission
            </h1>
            <p className="text-[#252A24] font-source-sans-pro  font-normal leading-normal text-[18px] w-[259px] ">
              To help build Web3 talents from ground zero, through full-stack
              and smart contract developments
            </p>
          </div>
          <div className=" h-auto min-h-[244px]  ">
            <h1 className=" text-[#C54809]  font-sans font-bold leading-normal text-[24px]">
              Contact Us
            </h1>

            <div>
              <p className=" mb-[21px] text-[16px] w-[259px] ">
                2, Sheikh Zakariyah Adebayo Yusuf Street, PEGAMUT, 102112, Ota,
                Ogun State
              </p>
            </div>
            <div className="mb-[21px]">
              <p className="font-[700] text-[16px] w-[300px] ">
                For more info about our Classes
              </p>
              <p className="">(234)815 650 9701</p>
            </div>

            <div className="mb-[21px]">
              <p className="font-[700] ">Email:</p>
              <a href="mailto:info@dltafrica.io" className="">
                info@dltafrica.io
              </a>
            </div>
          </div>
          <div className=" ">
            <h1 className="w-[140px] text-[#C54809] font-sans font-bold leading-normal text-[24px] ">
              Quick Links
            </h1>
            <ul>
              <li className="transition duration-500 ease-in-out transform hover:-translate-y-1 ">
                <a href="/team" className="">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-6 pb-5 justify-center mt-[80px] mb-[42px] ">
        <a href="https://www.facebook.com/share/1C7CRtQDN31XBgVb/?mibextid=LQQJ4d">
          <FaFacebook className="w-[35px] h-[35px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
        </a>
        <a href="https://www.instagram.com/dlta_frica/">
          <FaInstagram className="w-[35px] h-[35px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
        </a>
        <a href="https://www.linkedin.com/company/dlt-africa/">
          <FaLinkedin className="w-[35px] h-[35px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
        </a>
        <a href="https://twitter.com/dlt_africa">
          <FaTwitter className="w-[35px] h-[35px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
        </a>
        <a href="https://github.com/DLT-Africa">
          <FaGithub className="w-[35px] h-[35px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
