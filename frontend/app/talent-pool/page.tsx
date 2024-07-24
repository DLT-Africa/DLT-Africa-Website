"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type SkillResponse = {
  [key: string]: any;
};

const Talent: React.FC = () => {
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<SkillResponse>(
          `https://dlt-backend.vercel.app/api/v1/skill/skills`
        );
        const skillCategories = Object.keys(response.data).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setAvailableSkills(skillCategories);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="h-screen bg-[#f3f6f6] flex flex-col items-center">
      <h1 className="text-[#441606] text-[36px] mt-[85px] mb-[61px] font-[400]">
        DLT Africa Talent Pool
      </h1>

      <div className="">
        <div>{/* buttons */}</div>
        <div></div>
      </div>
    </section>
  );
};

export default Talent;
