import Link from "next/link";
import React, { useState } from "react";
import { navbarContent } from "../../configs/navbarConfig";

import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";


const Header = () => {
  const [openTop, setOpenTop] = useState(false);

  const openDrawerTop = () => setOpenTop(true);
  const closeDrawerTop = () => setOpenTop(false); 


  return (
    <>
      <div className="flex justify-between p-[20]  py-[20px] ">
        <div>
          <Link href={"/"}>
            <img src={navbarContent.logo} />
          </Link>
        </div>
        <div className="flex flex-end">
          <div className="flex ">
            <img
              onClick={openDrawerTop}
              src="/images/Headericon.svg"
              alt="icon"
            />
          </div>
          <Drawer
            placement="top"
            open={openTop}
            onClose={closeDrawerTop}
            className="p-4 min-h-[300px] px-[50px] "
            
          >
            <div className="mb-6 flex items-center justify-between ">cd
              <Link href={"/"}>
              <img src="/images/Logolefticon.svg" alt="icon" />                
                {/* <img src={navbarContent.logo} /> */}
              </Link>
              <svg
                onClick={closeDrawerTop}
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="50"
                viewBox="0 0 51 50"
                fill="none"
                className="h-10 w-10 cursor-pointer"
              >
                <line
                  x1="2.76777"
                  y1="2.23223"
                  x2="48.7297"
                  y2="48.1942"
                  stroke="#FC7C13"
                  strokeWidth="5"
                />
                <line
                  x1="2.75128"
                  y1="48.2132"
                  x2="48.7132"
                  y2="2.25125"
                  stroke="#FEA650"
                  strokeWidth="5"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-4 pr-20 items-end  p-[10]">
              <Link className="hover:text-[#FC7C13]" href={"/"}>
                <div>Home</div>
              </Link>
              <Link className="hover:text-[#FC7C13]" href={"/hackerHouse"}>
                <div >Hacker House</div>
              </Link>
              <Link className="hover:text-[#FC7C13]" href={"/blog"}>
                <div>Blog</div>
              </Link>
              <Link className="hover:text-[#FC7C13]" href={"/team"}>
                <div>Our Team</div>
              </Link>
              <Link className="hover:text-[#FC7C13]" href={"/courses"}>
                <div>Programmes</div>
              </Link>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Header;
