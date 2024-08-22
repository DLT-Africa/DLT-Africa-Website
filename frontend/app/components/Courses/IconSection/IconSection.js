import { useState, useEffect } from "react";

const IconSection = ({
  title,
  text,
  text1,
  icon,
  courseConClass,
  iconBodyClass,
  iconsClass,
  titleClass,
  textClass,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      setIsSmallDevice(mediaQuery.matches);
    };
    mediaQuery.addListener(handleResize);
    handleResize();
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  return (
    <div
      className={`courseCon ${courseConClass} cursor-pointer relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`iconBody ${iconBodyClass} w-[95%] flex justify-center`}>
        <article className="flex justify-center items-center flex-col">
          {/* Icon and Title */}
          <div
            className={`icons ${iconsClass} transition-all duration-300 ease-in-out transform delay-500 ${isHovered ? "opacity-0" : "opacity-100"
              }`}
          >
            {icon}
          </div>
          <span
            className={`block ${titleClass} transition-all duration-300 ease-in-out transform delay-500 ${isHovered ? "opacity-0" : "opacity-100"
              }`}
          >
            {title}
          </span>

          {/* Text  */}
          <h5
            className={`absolute inset-0 flex items-center justify-center text-[12px] ${textClass} transition-all duration-300 ease-in-out transform  delay-500 ${isHovered ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            {text}
          </h5>
          <h5
            className={`absolute inset-0 flex items-center justify-center text-[12px] ${textClass} transition-all duration-300 ease-in-out transform delay-500  ${isHovered ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            {text1}
          </h5>
        </article>
      </div>
    </div>
  );
};

export default IconSection;
