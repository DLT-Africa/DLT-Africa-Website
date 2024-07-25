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
  const [selectedTalent, setSelectedTalent] = useState(null); // State to track selected talent

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

  const handleCardClick = (talent) => {
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent)); // Toggle selection
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
        className={`m-2 bg-white shadow rounded-[10px] h-[473px] w-[387px] flex justify-end flex-col overflow-hidden relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer ${
          selectedTalent === talent ? "selected" : ""
        }`}
        onClick={() => handleCardClick(talent)}
      >
        {selectedTalent === talent ? (
          <div className="h-full w-full detail-card px-[40px] py-[30px] flex flex-col items-center gap-[15px] border-[1px] 	border-orange-400 ">
            <div className="w-full flex flex-col items-center gap-[10px]">
              <img
                src={talent.addImage}
                className="h-[180px] w-[180px] rounded-full"
              />
              <p className="font-dmSerifDisplay font-medium text-[22px] text-[#3E493C] ">
                {talent.fullName}
              </p>
              <p className="font-poppins font-medium text-[16px] text-[#343C33]">
                {capitalizeFirstLetter(talent.skills[0])}
              </p>
            </div>
            <div className="w-full flex  min-h-[50px] items-center justify-center">
              <p className=" break-words text-center font-poppins font-light text-[14px] text-[#60705C] "> Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis</p>
            </div>
            <div className="flex items-center justify-center gap-[7px] ">
              <button className="border-[#C54809] border py-[18px] px-[19.5px] rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px] w-[105px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]">Resume</button>

              <button className="border-[#C54809] border py-[18px] px-[19.5px] rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px] w-[105px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]">GitHub</button>

              <button className="border-[#C54809] border py-[18px] px-[19.5px] rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px] w-[105px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]">Contact</button>
            </div>
            
          </div>
        ) : (
          <>
            <img
              src={talent.addImage}
              alt={talent.fullName}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className=" glass bg-opacity-20 p-4 relative z-10">
              <h2 className="font-medium text-[36px] text-[#F7FCFE] font-dmSerifDisplay">{talent.fullName}</h2>
              <p className="capitalize text-[16px] font-poppins font-normal text-[#F7FCFE]">{talent.skills[0]}</p>
            </div>
          </>
        )}
      </div>
    ));
  };

  return (
    <section className="h-auto bg-[#f3f6f6] flex flex-col items-center pb-4">
      <h1 className="text-[#441606] font-dmSerifDisplay text-[36px] font-medium md:text-[36px] mt-[85px] mb-[61px] font-[400]">
        DLT Africa Talent Pool
      </h1>

      <div className="flex  flex-wrap w-full px-[50px]	 md:flex-nowrap	 p-4">
        {renderButtons()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full px-[50px]">
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

