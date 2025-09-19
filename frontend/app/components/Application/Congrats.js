"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Congrats = () => {
  const [countdown, setCountdown] = useState(15);
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/bootcamp");
    }
  }, [countdown]);

  useEffect(() => {
    setShowConfetti(true);

    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 20000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {showConfetti && <Confetti />}
      <div className="w-[100%] h-screen rounded-[20px] flex justify-center items-center relative">
        <div className="flex flex-col text-center">
          <h1 className="text-[#FC7C13] text-4xl leading-[43.2px] tracking-[7%] mx-auto">
            Congratulations!!!
            <br />
          </h1>
          <div>
            <p className="h-[48px] opacity-75% text-center">
              Your application has been successfully submitted. Please expect to
              receive an email from our team within a few days regarding your
              next steps.
            </p>
            <p>OR</p>
            <br />
            <p>
              Send a message to our{" "}
              <a
                href="https://wa.link/3bzyk6"
                className="text-[#FC7C13]"
                target="_blank"
              >
                WhatsApp
              </a>
            </p>

            <div className="absolute top-0 right-0 p-2 m-4 text-green-900 rounded-lg shadow">
              <p>Redirecting to homepage in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
