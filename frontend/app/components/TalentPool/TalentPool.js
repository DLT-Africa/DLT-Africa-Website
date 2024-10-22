"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import NewForm from "./TalentPoolForm";

const URL = "https://talent-pool-server.vercel.app";

const TalentPool = () => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [talents, setTalents] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(["Frontend"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setFetching(true)
      try {
        const response = await axios.get(`${URL}/api/v1/skill/skills`);
        const skillCategories = Object.keys(response.data).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setAvailableSkills(skillCategories);
        setFetching(false)

      } catch (error) {
        setFetching(false)

        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${URL}/api/v1/talent/talents`);
        setTalents(response.data.data);
        setLoading(false)

      } catch (error) {
        setLoading(false)

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


  const handlePageChange = async (direction) => {
    if (loading) return;
    setLoading(true); 

    const nextPage = direction === "next" ? currentPage + 1 : Math.max(currentPage - 1, 1);

    try {
      const response = await axios.get(`${URL}/api/v1/talent/talents`, {
        params: { page: nextPage, itemsPerPage }
      });
      setTalents(response.data.data);
      setCurrentPage(nextPage);
    } catch (error) {
      toast.error("Error fetching talents");
      console.error("Error fetching talents:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCardClick = (talent) => {
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));
  };

  const handleContactClick = (talent) => {
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          className={`${styles} ${isSelected ? "bg-gray-200" : ""
            } cyberpunk-checkbox-label`}
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
    if (loading) {
      return (
        <div className="text-center w-full">
          <p className="text-[20px] my-10 text-center">Loading talents...</p>
        </div>
      );
    }

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
        className={`h-[500px] md:h-[473px]   m-2 bg-white rounded-[10px] flex  justify-end flex-col overflow-hidden relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer ${selectedTalent === talent ? "selected" : ""
          }`}
        onClick={() => handleCardClick(talent)}
      >
        {selectedTalent === talent ? (
          <div className="h-full w-full detail-card px-[20px] sm:px-[40px] py-[20px] sm:py-[30px] flex flex-col items-center gap-[15px] border-orange-400">
            <div className="w-full flex flex-col items-center gap-[10px]">
              <img
                src={talent.profileImage}
                className="w-[80px] sm:w-[100px] md:w-[180px] h-[80px] sm:h-[100px] md:h-[180px] rounded-full"
              />
              <p className="font-dmSerifDisplay font-medium text-[15px] md:text-[22px] text-[#3E493C] ">
                {talent.fullName}
              </p>
              <p className="font-poppins font-medium text-[14px] sm:text-[16px] text-[#343C33] text-center ">
                {capitalizeFirstLetter(talent.role)}
              </p>
            </div>

            <div className="w-full flex min-h-[50px] items-center justify-center">
              <p className="description break-words text-center font-poppins font-light text-[12px] sm:text-[14px] text-[#60705C]">
                {talent.description.length > 100
                  ? `${talent.description.substring(0, 100)}...`
                  : talent.description}
              </p>
            </div>
            <div className="flex items-center justify-center gap-[7px]">
              <a
                href={talent.uploadResume}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              >
                Resume
              </a>

              <a
                href={talent.gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[#C54809] border p-[10px] flex items-center justify-center rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
              >
                GitHub
              </a>

              <button
                className="border-[#C54809] border p-[10px] rounded-[10px] text-[#C54809] font-poppins font-medium text-[14px] sm:text-[16px] hover:bg-[#FFF8ED] ease-in duration-300 active:bg-[#FFEFD4]"
                onClick={handleContactClick}
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
            />

            <div className="p-4 relative z-10 bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-lg backdrop-brightness-125">
              <h2 className="font-medium md:text-[30px] sm:text-[28px] text-[#000] font-dmSerifDisplay">
                {talent.fullName}
              </h2>
              <p className="capitalize text-[14px] sm:text-[16px] font-poppins font-normal text-[#000] ">
                {talent.role}
              </p>
            </div>
          </div>
        )}
      </div>
    ));
  };


  return (
    <section className="h-auto bg-[#f3f6f6] flex flex-col items-center pb-4">
      <h1 className="text-[#441606] text-center font-dmSerifDisplay text-[36px] md:text-[36px] mt-[85px] mb-[61px] font-[400]">
        DLT Africa Talent Pool
      </h1>

      <div className="flex w-full px-[5px] md:px-[50px]  btnContainer ">
        {fetching ? "Fetching skills.." : renderButtons()}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px] md:gap-[25px]  lg:grid-cols-3 px-[10px]  py-[50px] w-full  ">
           a104f17ca2c9f63c172b5497f21bb45618ed63a9
        {loading ? "Loading..." : renderTalents()}
      </div>



      <div className="flex justify-between px-[10px] w-full max-w-[800px] mt-4">

        <button
          onClick={() => handlePageChange("prev")}
          className={`${currentPage === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
            } bg-[#C54809] text-white font-medium p-2 rounded`}
          disabled={currentPage === 1 || loading}
        >
          <IoIosArrowBack />
        </button>

        <button
          onClick={() => handlePageChange("next")}
          className={`${talents.length <= currentPage * itemsPerPage || loading
            ? "opacity-50 cursor-not-allowed"
            : ""
            } bg-[#C54809] text-white font-medium p-2 rounded`}
          disabled={talents.length <= currentPage * itemsPerPage || loading}
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
