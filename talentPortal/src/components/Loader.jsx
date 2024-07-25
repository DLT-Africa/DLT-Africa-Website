// src/components/Loader.js
import React from 'react';
import Lottie from 'lottie-react';
import animationData from './json-data/logo.json';

const Loader = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-[30rem] h-[30rem]"
        />
      </div>
    );
  };

export default Loader;
