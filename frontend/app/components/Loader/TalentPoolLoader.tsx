import React from "react";

const TalentPoolLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f3f6f6] to-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Main loading animation */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 border-4 border-[#C54809]/20 rounded-full"></div>
          <div className="w-24 h-24 border-4 border-transparent border-t-[#C54809] border-r-[#C54809] rounded-full animate-spin absolute top-0 left-0"></div>

          {/* Middle ring */}
          <div className="w-16 h-16 border-3 border-[#1E9500]/20 rounded-full absolute top-4 left-4"></div>
          <div
            className="w-16 h-16 border-3 border-transparent border-t-[#1E9500] border-b-[#1E9500] rounded-full animate-spin absolute top-4 left-4"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          {/* Inner dot */}
          <div className="w-6 h-6 bg-gradient-to-r from-[#C54809] to-[#1E9500] rounded-full absolute top-9 left-9 animate-pulse"></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="text-center">
          <h2 className="text-2xl font-dmSerifDisplay text-[#441606] mb-2">
            Loading Talent Pool
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-[#C54809] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[#1E9500] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#C54809] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#C54809] to-[#1E9500] rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default TalentPoolLoader;
