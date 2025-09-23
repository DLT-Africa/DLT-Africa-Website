import React from "react";
import TalentCard from "./TalentCard";
import TalentCardSkeleton from "./TalentCardSkeleton";
import { PAGINATION_CONFIG, ERROR_MESSAGES } from "./constants";

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

interface TalentGridProps {
  talents: Talent[];
  selectedTalent: Talent | null;
  loading: boolean;
  itemsPerPage: number;
  onCardClick: (talent: Talent) => void;
  onContactClick: (talent: Talent) => void;
}

const TalentGrid: React.FC<TalentGridProps> = ({
  talents,
  selectedTalent,
  loading,
  itemsPerPage,
  onCardClick,
  onContactClick,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px] md:gap-[25px] lg:grid-cols-3 px-[10px] py-[50px] w-full">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <TalentCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (talents.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px] md:gap-[25px] lg:grid-cols-3 px-[10px] py-[50px] w-full">
        <div className="col-span-full text-center w-full">
          <p className="text-[20px] my-10 text-center">
            {ERROR_MESSAGES.NO_TALENTS}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px] md:gap-[25px] lg:grid-cols-3 px-[10px] py-[50px] w-full">
      {talents.map((talent, index) => (
        <TalentCard
          key={talent._id || index}
          talent={talent}
          isSelected={selectedTalent === talent}
          onCardClick={onCardClick}
          onContactClick={onContactClick}
        />
      ))}
    </div>
  );
};

export default TalentGrid;
