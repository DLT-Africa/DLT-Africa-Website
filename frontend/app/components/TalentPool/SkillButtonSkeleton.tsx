import React from "react";

const SkillButtonSkeleton: React.FC = () => {
  const buttonColors = ["#C54809", "#1E9500", "#C54809", "#1E9500"];

  return (
    <div className="flex w-full px-[5px] md:px-[50px] btnContainer">
      {Array.from({ length: 4 }).map((_, index) => {
        const color = buttonColors[index % buttonColors.length];
        return (
          <div
            key={index}
            className="py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] border border-gray-200 relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

            {/* Checkbox skeleton */}
            <div
              className="h-4 w-4 rounded mr-2 border-2 animate-pulse"
              style={{ borderColor: color, backgroundColor: `${color}20` }}
            ></div>

            {/* Text skeleton */}
            <div
              className="h-4 rounded w-20 animate-pulse"
              style={{ backgroundColor: `${color}30` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillButtonSkeleton;
