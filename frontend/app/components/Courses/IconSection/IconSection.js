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
    handleResize(); // Initial check
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  return (
    <div
      className={`courseCon ${courseConClass}  cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`iconBody ${iconBodyClass} w-[95%] flex justify-center `}>
        <article className="flex justify-center items-center flex-col transition duration-500 ease-in-out delay-500 transform hover:-translate-y-1 hover:scale-70 ">
          <div className={`icons ${iconsClass}`}>{icon}</div>
          <span className={`block ${titleClass}`}>{title}</span>
          <h5
            className={`text-sm ${textClass} ${
              isSmallDevice || isHovered ? "block" : "hidden"
            } `}
          >
            {text}
          </h5>
          <h5
            className={`text-sm ${textClass} ${
              isSmallDevice || !isHovered ? "block" : "hidden"
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
