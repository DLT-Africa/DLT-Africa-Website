"use client";

import HackerHouseHero from "@/app/components/HackerHouse/HackerHouseHero";
import HackerHouseBuild from "@/app/components/HackerHouse/HackerHouseBuild";
import HackerHouseEventItinery from "@/app/components/HackerHouse/HackerHouseEventItinery";
import HackerHouseWorkshop from "@/app/components/HackerHouse/HackerHouseWorkshop";
import HackerHousePastEvent from "@/app/components/HackerHouse/HackerHousePastEvent";

const page = () => {
  return (
    <div>
      <HackerHouseHero />
      <HackerHouseBuild />
      <HackerHouseEventItinery />
      <HackerHouseWorkshop />
      <HackerHousePastEvent />
    </div>
  );
};

export default page;
