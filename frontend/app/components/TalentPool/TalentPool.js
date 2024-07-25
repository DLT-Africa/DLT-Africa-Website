"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const URL = "https://talent-pool-server.vercel.app";

const TalentPool = () => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [talents, setTalents] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("frontend");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/skill/skills`);
        const skillCategories = Object.keys(response.data).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setAvailableSkills(skillCategories);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/talent/talents`);
        setTalents(response.data.data);
      } catch (error) {
        console.error("Error fetching talents:", error);
        toast.error("Error fetching talents");
      }
    };

    fetchTalents();
  }, []);

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const renderButtons = () => {
    const buttonStyles = [
      "border border-[#C54809] text-[#C54809] py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] cursor-pointer capitalize",
      "border border-[#1E9500] text-[#1E9500] py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] cursor-pointer capitalize",
      "border border-[#C54809] text-[#C54809] py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] cursor-pointer capitalize",
      "border border-[#1E9500] text-[#1E9500] py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] cursor-pointer capitalize",
    ];

    const skillNames = {
      blockchain: "Blockchain Devs",
      frontend: "Frontend Devs",
      productDesign: "UI/UX Designers",
      fullstack: "Fullstack Devs",
    };

    return availableSkills.map((skill, index) => {
      const styles = buttonStyles[index % buttonStyles.length];
      return (
        <label key={index} className={styles}>
          <input
            type="radio"
            name="skill"
            value={skill}
            checked={selectedSkill === skill}
            onChange={() => handleSkillChange(skill)}
            className="cursor-pointer mr-2"
          />
          {skillNames[skill] || skill}
        </label>
      );
    });
  };
  const renderTalents = () => {
    const filteredTalents = talents.filter((talent) =>
      talent.skills.includes(selectedSkill)
    );

    if (filteredTalents.length === 0) {
      return (
        <div className="text-center w-screen">
          <p className="text-[20px] ">
            No talent for this skill yet... Check back later.
          </p>
        </div>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTalents = filteredTalents.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return paginatedTalents.map((talent, index) => (
      <div
        key={index}
        className="p-4 m-2 bg-white shadow rounded h-[300px] w-[300px] flex justify-end flex-col overflow-hidden relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
      >
        <img
          src={talent.addImage}
          alt={talent.fullName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="bg-white bg-opacity-70 p-4 rounded relative z-10">
          <h2 className="text-[24px] font-semibold">{talent.fullName}</h2>
          <p className="capitalize text-[16px]">{talent.skills[0]}</p>
        </div>
      </div>
    ));
  };

  return (
    <section className="h-auto bg-[#f3f6f6] flex flex-col items-center pb-4">
      <h1 className="text-[#441606] text-[25px] md:text-[36px] mt-[85px] mb-[61px] font-[400]">
        DLT Africa Talent Pool
      </h1>

      <div className="flex items-center flex-wrap	 md:flex-nowrap	 p-4">
        {renderButtons()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {renderTalents()}
      </div>

      <div className="flex justify-between gap-2 items-center mt-10">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-orange-800 text-white py-2 px-4 rounded cursor-pointer"
        >
          <IoIosArrowBack size={20} />
        </button>
        <span className="text-[25px] ">{currentPage}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={
            currentPage * itemsPerPage >=
            talents.filter((talent) => talent.skills.includes(selectedSkill))
              .length
          }
          className="bg-green-800 text-white py-2 px-4 rounded cursor-pointer"
        >
          <MdOutlineNavigateNext size={20} />
        </button>
      </div>
    </section>
  );
};

export default TalentPool;
