import { useState, useEffect } from "react";

interface IconSectionProps {
  title: string;
  text: string;
  text1: string;
  icon: React.ReactNode;
  courseConClass: string;
  iconBodyClass: string;
  iconsClass: string;
  titleClass: string;
  textClass: string;
}

const IconSection: React.FC<IconSectionProps> = ({
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (): void => {
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
            className={`icons ${iconsClass} transition-all duration-300 ease-in-out transform delay-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            {icon}
          </div>
          <span
            className={`block ${titleClass} transition-all duration-300 ease-in-out transform delay-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            {title}
          </span>

          {/* Text  */}
          <h5
            className={`absolute inset-0 flex items-center justify-center text-[12px] ${textClass} transition-all duration-300 ease-in-out transform  delay-500 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {text}
          </h5>
          <h5
            className={`absolute inset-0 flex items-center justify-center text-[12px] ${textClass} transition-all duration-300 ease-in-out transform delay-500  ${
              isHovered
                ? "opacity-100 translate-y-0"
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
