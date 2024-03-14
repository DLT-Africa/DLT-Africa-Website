import HackerHouseBuild from "../components/HackerHouse/HackerHouseBuild";
import HackerHouseEventItinery from "../components/HackerHouse/HackerHouseEventItinery";
import HackerHouseHero from "../components/HackerHouse/HackerHouseHero";
import HackerHousePastEvent from "../components/HackerHouse/HackerHousePastEvent";
import HackerHouseWorkshop from "../components/HackerHouse/HackerHouseWorkshop";

const hackerHouse = () => {
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

export default hackerHouse;
