import React from "react";
import Lottie from 'lottie-react';
import animationData from '../../json-data/logo.json';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
      <div className="w-80 h-80">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
