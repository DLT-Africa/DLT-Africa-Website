import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white  flex items-center justify-center z-50">
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-orange-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-orange-700 animate-bounce [animation-delay:.3s]"></div>
      </div>
    </div>
  );
};

export default Loader;
