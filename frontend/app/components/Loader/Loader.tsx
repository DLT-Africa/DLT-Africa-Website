"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../json-data/logo.json";

const Loader: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen bg-white flex items-center justify-center z-50">
        <div className="w-[30rem] h-[30rem] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white flex items-center justify-center z-50">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-[30rem] h-[30rem]"
      />
    </div>
  );
};

export default Loader;
