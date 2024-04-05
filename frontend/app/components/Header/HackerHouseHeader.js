"use client";

import Link from "next/link";
import React, { useState } from "react";
import { navbarContent } from "../../configs/navbarConfig";
import Hamburger from "../../../public/Hamburger.png";
import dlt from "../../dlt.png";

import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";

const HackerHouseHeader = () => {
  const [openTop, setOpenTop] = useState(false);

  const openDrawerTop = () => setOpenTop(true);
  const closeDrawerTop = () => setOpenTop(false);

  return (
    <>
      <div className="flex justify-between px-[50px] py-[20px] bg-[#000]   ">
        <div>
          <Link href={"/"}>
            <img src={navbarContent.logo} />
          </Link>
        </div>
        <div className="flex flex-end">
          <div className="flex ">
            <Image
              src={Hamburger}
              onClick={openDrawerTop}
              className="cursor-pointer	"
            />
          </div>
          <Drawer
            placement="top"
            open={openTop}
            onClose={closeDrawerTop}
            className="p-4 min-h-[300px] px-[50px] "
          >
            <div className="mb-6 flex items-center justify-between ">
              <Link href={"/"}>
                <Image src={dlt} />
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
              <Link className=" text=[18px] hover:text-[#FC7C13]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" href={"/"}>
                Home
              </Link>

              <a
                className="text=[18px] hover:text-[#FC7C13]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                href="https://medium.com/@DLTAfrica"
              >
                Blog
              </a>
              <Link
                className=" text=[18px] hover:text-[#FC7C13]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                href={"/team"}
              >
                Our Team
              </Link>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default HackerHouseHeader;
