"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Congrats = () => {
  const [countdown, setCountdown] = useState(15);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[100%] rounded-[20px] flex justify-center items-center relative">
        <div className="flex flex-col text-center">
          <h1 className="text-[#FC7C13] text-4xl leading-[43.2px] tracking-[7%] mx-auto">
            Congratulations!!!
            <br />
          </h1>
          <div>
            <p className="h-[48px] opacity-75% text-center">
              Your application has been successfully submitted. <br />
              You'll receive an email from our team regarding your <br /> next
              steps shortly.
            </p>
            <br />
            <p>
              If you don't receive any email within a few minutes, <br /> please
              check your spam folder.
            </p>

            <div className="absolute top-0 right-0 m-4 p-2 text-green-900 rounded-lg shadow">
              <p>Redirecting to homepage in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
