import React from "react";
import { UI_CONFIG, ACCESSIBILITY_CONFIG } from "./constants";

interface Talent {
  _id: string;
  fullName: string;
  role: string;
  description: string;
  skills: string[];
  profileImage: string;
  bgImage: string;
  uploadResume: string;
  gitHubLink: string;
}

interface TalentCardProps {
  talent: Talent;
  isSelected: boolean;
  onCardClick: (talent: Talent) => void;
  onContactClick: (talent: Talent) => void;
}

const TalentCard: React.FC<TalentCardProps> = ({
  talent,
  isSelected,
  onCardClick,
  onContactClick,
}) => {
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className={`${UI_CONFIG.CARD_HEIGHT.MOBILE} ${
        UI_CONFIG.CARD_HEIGHT.DESKTOP
      } m-2 bg-white rounded-[10px] flex justify-end flex-col overflow-hidden relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onCardClick(talent)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick(talent);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${talent.fullName}, ${talent.role}`}
      aria-expanded={isSelected}
    >
      {isSelected ? (
        <div className="h-full w-full detail-card px-[20px] sm:px-[40px] py-[20px] sm:py-[30px] flex flex-col items-center gap-[15px] border-orange-400">
          <div className="w-full flex flex-col items-center gap-[10px]">
            <img
              loading="lazy"
              src={talent.profileImage}
              className="w-[80px] sm:w-[100px] md:w-[180px] h-[80px] sm:h-[100px] md:h-[180px] rounded-full"
              alt={`${talent.fullName} profile`}
            />
            <p className="font-dmSerifDisplay font-medium text-[15px] md:text-[22px] text-[#3E493C]">
              {talent.fullName}
            </p>
            <p className="font-poppins font-medium text-[14px] sm:text-[16px] text-[#343C33] text-center">
              {capitalizeFirstLetter(talent.role)}
            </p>
          </div>

          <div className="w-full flex min-h-[50px] items-center justify-center">
            <p className="description break-words text-center font-poppins font-light text-[12px] sm:text-[14px] text-[#60705C]">
              {talent.description.length > UI_CONFIG.DESCRIPTION_MAX_LENGTH
                ? `${talent.description.substring(
                    0,
                    UI_CONFIG.DESCRIPTION_MAX_LENGTH
                  )}...`
                : talent.description}
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-[7px]"
            role="group"
            aria-label={ACCESSIBILITY_CONFIG.ARIA_LABELS.TALENT_ACTIONS}
          >
            <a
              href={talent.uploadResume}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              aria-label={`View ${talent.fullName}'s resume`}
            >
              Resume
            </a>

            <a
              href={talent.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              aria-label={`View ${talent.fullName}'s GitHub profile`}
            >
              GitHub
            </a>

            <button
              className="border-[#C54809] border p-[10px] rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              onClick={() => onContactClick(talent)}
              aria-label={`Contact ${talent.fullName}`}
            >
              Contact
            </button>
          </div>
        </div>
      ) : (
        <div>
          <img
            src={talent.bgImage}
            alt={talent.fullName}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          <div className="p-4 relative z-10 bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-lg backdrop-brightness-125">
            <h2 className="font-medium md:text-[30px] sm:text-[28px] text-[#000] font-dmSerifDisplay">
              {talent.fullName}
            </h2>
            <p className="capitalize text-[14px] sm:text-[16px] font-poppins font-normal text-[#000]">
              {talent.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentCard;
