import React from "react";

const TalentCardSkeleton: React.FC = () => {
  return (
    <div className="h-[500px] md:h-[473px] m-2 bg-white rounded-[10px] flex justify-end flex-col overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>

      {/* Content skeleton with better animations */}
      <div className="p-4 relative z-10 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-lg backdrop-brightness-125">
        {/* Name skeleton with wave animation */}
        <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-2 w-3/4 animate-shimmer bg-[length:200%_100%]"></div>
        {/* Role skeleton with wave animation */}
        <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/2 animate-shimmer bg-[length:200%_100%]"></div>
      </div>

      {/* Floating elements for more dynamic feel */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full animate-bounce"></div>
      <div
        className="absolute top-12 right-8 w-4 h-4 bg-gray-300 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
};

export default TalentCardSkeleton;
