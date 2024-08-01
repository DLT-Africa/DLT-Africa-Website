"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import NewForm from "./TalentPoolForm";

const URL = "http://localhost:5000";
// const URL = "https://talent-pool-server.vercel.app";

const TalentPool = () => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [talents, setTalents] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(["Frontend"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill);
      } else {
        return [...prevSkills, skill];
      }
    });
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const handleCardClick = (talent) => {
    console.log("Selected talent:", talent);
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));
  };

  const handleContactClick = (talent) => {
    console.log("Opening modal with talent:", selectedTalent);
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const renderButtons = () => {
    const buttonStyles = [
      {
        border: "border border-[#C54809]",
        textColor: "text-[#C54809]",
        padding: "py-2 px-4",
        margin: "m-2",
        borderRadius: "rounded",
        display: "flex items-center justify-center",
        fontSize: "text-[16px]",
        cursor: "cursor-pointer",
        textTransform: "capitalize",
      },
      {
        border: "border border-[#1E9500]",
        textColor: "text-[#1E9500]",
        padding: "py-2 px-4",
        margin: "m-2",
        borderRadius: "rounded",
        display: "flex items-center justify-center",
        fontSize: "text-[16px]",
        cursor: "cursor-pointer",
        textTransform: "capitalize",
      },
      {
        border: "border border-[#C54809]",
        textColor: "text-[#C54809]",
        padding: "py-2 px-4",
        margin: "m-2",
        borderRadius: "rounded",
        display: "flex items-center justify-center",
        fontSize: "text-[16px]",
        cursor: "cursor-pointer",
        textTransform: "capitalize",
      },
      {
        border: "border border-[#1E9500]",
        textColor: "text-[#1E9500]",
        padding: "py-2 px-4",
        margin: "m-2",
        borderRadius: "rounded",
        display: "flex items-center justify-center",
        fontSize: "text-[16px]",
        cursor: "cursor-pointer",
        textTransform: "capitalize",
      },
    ];

    const createButtonClass = (style) => {
      return `${style.border} ${style.textColor} ${style.padding} ${style.margin} ${style.borderRadius} ${style.display} ${style.fontSize} ${style.cursor} ${style.textTransform}`;
    };
    const extractColorFromClass = (classString, prefix) => {
      const regex = new RegExp(`${prefix}-\\[(#[a-fA-F0-9]+)\\]`);
      const match = classString.match(regex);
      return match ? match[1] : null;
    };

    return availableSkills.map((skill, index) => {
      const style = buttonStyles[index % buttonStyles.length];
      const styles = createButtonClass(style);
      const isSelected = selectedSkills.includes(skill);
      const borderColor = extractColorFromClass(styles, "border");
      const textColor = extractColorFromClass(styles, "text");
      return (
        <label
          key={index}
          className={`${styles} ${isSelected ? "bg-gray-200" : ""} cyberpunk-checkbox-label`}
        >
          <input
            type="checkbox"
            name="skill"
            value={skill}
            checked={isSelected}
            onChange={() => handleSkillChange(skill)}
            className={`cursor-pointer mr-2 border ${borderColor}`}
            style={{
              accentColor: textColor,
            }}
          />
          {skill}
        </label>
      );
    });
  };

  const renderTalents = () => {
    const filteredTalents = talents.filter((talent) =>
      selectedSkills.every((skill) => talent.skills.includes(skill))
    );

    if (filteredTalents.length === 0) {
      return (
        <div className="text-center w-full">
          <p className="text-[20px] my-10 text-center">
            No talent for these skills yet...
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
        className={`m-2 bg-white shadow rounded-[10px] w-[300px] h-[400px] md:h-[473px] md:w-[387px] flex  justify-end flex-col overflow-hidden relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer ${
          selectedTalent === talent ? "selected" : ""
        }`}
        onClick={() => handleCardClick(talent)}
      >
        {selectedTalent === talent ? (
          <div className="h-full w-full detail-card px-[40px] py-[30px] flex flex-col items-center gap-[15px] border-[1px] 	border-orange-400 ">
            <div className="w-full flex flex-col items-center gap-[10px]">
              <img
                src={talent.profileImage}
                className="w-[100px] h-[100px] md:h-[180px] md:w-[180px] rounded-full"
              />
              <p className="font-dmSerifDisplay font-medium text-[22px] text-[#3E493C] ">
                {talent.fullName}
              </p>
              <p className="font-poppins font-medium text-[16px] text-[#343C33]">
                {capitalizeFirstLetter(talent.skills[0])}
              </p>
            </div>

            <div className="w-full flex  min-h-[50px] items-center justify-center">
              <p className=" description break-words text-center font-poppins font-light text-[14px] text-[#60705C] ">

                {" "}
                {truncateDescription(talent.description, 30)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-[7px]  ">
              <a
                href={talent.uploadResume}
                className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px]  hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              >
                Resume
              </a>

              <a
                href={talent.gitHubLink}
                className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px]  hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              >
                GitHub
              </a>

              <button
                className="border-[#C54809] border p-[10px]  rounded-[10px] text-[#C54809] font-poppins font-medium text-[16px]  hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
                onClick={handleContactClick}
              >
                Contact
              </button>
            </div>
          </div>
        ) : (
          <>
            <img
              src={talent.bgImage}
              alt={talent.fullName}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className=" glass bg-opacity-20 p-4 relative z-10">
              <h2 className="font-medium text-[36px] text-[#F7FCFE] font-dmSerifDisplay">
                {talent.fullName}
              </h2>
              <p className="capitalize text-[16px] font-poppins font-normal text-[#F7FCFE]">
                {talent.role}
              </p>
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

      <div className="flex w-full px-[10px] md:px-[50px] btnContainer">
        {renderButtons()}
      </div>

      <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4 w-full px-[10px] md:px-[50px] py-[50px]">
        {renderTalents()}
      </div>

      <div className="flex justify-between px-[10px] w-full max-w-[800px] mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          className={`${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          } bg-[#C54809] text-white font-medium p-2 rounded`}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className={`${
            talents.length <= currentPage * itemsPerPage
              ? "opacity-50 cursor-not-allowed"
              : ""
          } bg-[#C54809] text-white font-medium p-2 rounded`}
          disabled={talents.length <= currentPage * itemsPerPage}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>

      {isModalOpen && selectedTalent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 w-screen">
          <NewForm
            selectedTalent={selectedTalent}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}
    </section>
  );
};

export default TalentPool;
