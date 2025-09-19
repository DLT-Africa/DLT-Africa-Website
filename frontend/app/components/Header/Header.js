"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Drawer } from "@material-tailwind/react";

const Header = () => {
  const [openRight, setOpenRight] = useState(false);
  const [pathname, setPathname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return;
    }

    const loggedIn = localStorage.getItem("isLoggedIn");

    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return;
    }

    setPathname(window.location.pathname);

    const handlePathnameChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathnameChange);

    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  }, []);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (openRight) {
      // Prevent scrolling when drawer is open
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      return;
    }

    // Restore scrolling when drawer is closed
    document.body.style.overflow = "";
    document.body.style.height = "";
    document.body.style.position = "";
    document.body.style.width = "";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }
    };
  }, [openRight]);

  return (
    <div>
      <div
        className="flex justify-between py-[10px]  sm:py-5 px-[20px] sm:px-[10px] md:px-[50px] "
        style={{
          backgroundColor:
            pathname === "/hacker-house/" ? "#031700" : "#F6F7F6",
        }}
      >
        <div className="sm:py-0 sm:px-0">
          <Link href={"/bootcamp"}>
            <img
              src="/images/wilddlt.png"
              className="w-[180px]  "
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex flex-end">
          <div
            className="flex flex-col items-end justify-center gap-2 cursor-pointer"
            onClick={openDrawerRight}
          >
            <div className="w-[50px] h-[5px] bg-orange-500 transition-all duration-300 ease-in-out"></div>
            <div className="w-[25px] h-[5px] bg-orange-500 hover:w-[45px] transition-all duration-300 ease-in-out"></div>
          </div>
          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="flex justify-between items-start pt-6 bg-gradient-to-b from-gray-50 to-white"
          >
            <div className="flex flex-col gap-6 w-full h-full">
              {/* Header Section */}
              <div className="w-full flex items-center justify-between p-6 pt-0 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FC7C13] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DLT</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    DLT Africa
                  </span>
                </div>
                <button
                  onClick={closeDrawerRight}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Section */}
              <div className="flex flex-col gap-2 w-full px-6 flex-1">
                {/* Admin Section */}
                {isLoggedIn && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                      Admin
                    </div>
                    <div className="space-y-1">
                      <Link
                        className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                        href={"/admin-dashboard"}
                        onClick={closeDrawerRight}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-[#FC7C13]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <button
                        className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group w-full text-left"
                        onClick={() => {
                          handleLogout();
                          closeDrawerRight();
                        }}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Navigation */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    Navigation
                  </div>
                  <div className="space-y-1">
                    <Link
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        pathname === "/courses" ||
                        pathname.startsWith("/courses/") ||
                        pathname === "/frontend" ||
                        pathname === "/fullstack" ||
                        pathname === "/blockchain" ||
                        pathname === "/graphics-design" ||
                        pathname === "/product"
                          ? "text-[#FC7C13] bg-orange-50"
                          : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                      }`}
                      href={"/courses"}
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          pathname === "/courses" ||
                          pathname.startsWith("/courses/") ||
                          pathname === "/frontend" ||
                          pathname === "/fullstack" ||
                          pathname === "/blockchain" ||
                          pathname === "/graphics-design" ||
                          pathname === "/product"
                            ? "text-[#FC7C13]"
                            : "text-gray-400 group-hover:text-[#FC7C13]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="font-medium">Courses</span>
                    </Link>

                    <Link
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        pathname === "/event" || pathname.startsWith("/event")
                          ? "text-[#FC7C13] bg-orange-50"
                          : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                      }`}
                      href={"/event"}
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          pathname === "/event" || pathname.startsWith("/event")
                            ? "text-[#FC7C13]"
                            : "text-gray-400 group-hover:text-[#FC7C13]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">Events</span>
                    </Link>

                    {pathname != "/hacker-house" && (
                      <Link
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                          pathname === "/hacker-house" ||
                          pathname.startsWith("/hacker-house")
                            ? "text-[#FC7C13] bg-orange-50"
                            : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                        }`}
                        href={"/hacker-house"}
                        onClick={closeDrawerRight}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            pathname === "/hacker-house" ||
                            pathname.startsWith("/hacker-house")
                              ? "text-[#FC7C13]"
                              : "text-gray-400 group-hover:text-[#FC7C13]"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="font-medium">Hacker House</span>
                      </Link>
                    )}

                    <Link
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        pathname === "/team" || pathname.startsWith("/team")
                          ? "text-[#FC7C13] bg-orange-50"
                          : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                      }`}
                      href={"/team"}
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          pathname === "/team" || pathname.startsWith("/team")
                            ? "text-[#FC7C13]"
                            : "text-gray-400 group-hover:text-[#FC7C13]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="font-medium">Our Team</span>
                    </Link>

                    <Link
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        pathname === "/talent-pool" ||
                        pathname.startsWith("/talent-pool")
                          ? "text-[#FC7C13] bg-orange-50"
                          : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                      }`}
                      href={"/talent-pool"}
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          pathname === "/talent-pool" ||
                          pathname.startsWith("/talent-pool")
                            ? "text-[#FC7C13]"
                            : "text-gray-400 group-hover:text-[#FC7C13]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                        />
                      </svg>
                      <span className="font-medium">Talent Pool</span>
                    </Link>

                    <Link
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        pathname === "/codecorps" ||
                        pathname.startsWith("/codecorps") ||
                        pathname === "/corpers"
                          ? "text-[#FC7C13] bg-orange-50"
                          : "text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50"
                      }`}
                      href={"/codecorps"}
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          pathname === "/codecorps" ||
                          pathname.startsWith("/codecorps") ||
                          pathname === "/corpers"
                            ? "text-[#FC7C13]"
                            : "text-gray-400 group-hover:text-[#FC7C13]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">Corper's Registration</span>
                    </Link>
                  </div>
                </div>

                {/* External Links */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    Resources
                  </div>
                  <div className="space-y-1">
                    <a
                      className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:text-[#FC7C13] hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                      href="https://medium.com/@DLTAfrica"
                      onClick={closeDrawerRight}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-[#FC7C13]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      <span className="font-medium">Blog</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
