"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NewForm from "./TalentPoolForm";
import SkillFilter from "./SkillFilter";
import TalentGrid from "./TalentGrid";
import Pagination from "./Pagination";
import {
  API_CONFIG,
  PAGINATION_CONFIG,
  ACCESSIBILITY_CONFIG,
  ERROR_MESSAGES,
} from "./constants";
import { useApiWithRetry } from "./useApiWithRetry";

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

const TalentPool: React.FC = () => {
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [allTalents, setAllTalents] = useState<Talent[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Frontend"]);
  const [currentPage, setCurrentPage] = useState<number>(
    PAGINATION_CONFIG.DEFAULT_PAGE
  );
  const [itemsPerPage] = useState<number>(PAGINATION_CONFIG.ITEMS_PER_PAGE);
  const [totalTalents, setTotalTalents] = useState<number>(0);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const skillsApi = useApiWithRetry<{ [key: string]: any }>();
  const talentsApi = useApiWithRetry<{ data: Talent[]; total: number }>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchSkills = async () => {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SKILLS}`,
        {
          signal: abortController.signal,
        }
      );
      return response.data;
    };

    skillsApi.executeWithRetry(
      fetchSkills,
      (data) => {
        const skillCategories = Object.keys(data).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setAvailableSkills(skillCategories);
      },
      (error) => {
        console.error("Error fetching skills:", error);
        toast.error(`${ERROR_MESSAGES.FETCH_SKILLS}: ${error}`);
      }
    );

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTalents = async () => {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TALENTS}`,
        {
          signal: abortController.signal,
        }
      );
      return response.data;
    };

    talentsApi.executeWithRetry(
      fetchTalents,
      (data) => {
        const talentsArray = data.data || data;
        setAllTalents(talentsArray);
        setTotalTalents(Array.isArray(talentsArray) ? talentsArray.length : 0);
      },
      (error) => {
        console.error("Error fetching talents:", error);
        toast.error(`${ERROR_MESSAGES.FETCH_TALENTS}: ${error}`);
      }
    );

    return () => {
      abortController.abort();
    };
  }, []); // Only fetch once on component mount

  // Reset to first page when skills change
  useEffect(() => {
    setCurrentPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  }, [selectedSkills]);

  // Filter and paginate talents on the client side
  const filteredTalents = allTalents.filter(
    (talent) =>
      talent.skills &&
      Array.isArray(talent.skills) &&
      selectedSkills.every((skill) => talent.skills.includes(skill))
  );

  const paginatedTalents = filteredTalents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSkillChange = (skill: string): void => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill);
      } else {
        return [...prevSkills, skill];
      }
    });
  };

  const handlePageChange = (direction: "next" | "prev"): void => {
    if (talentsApi.loading) return;

    const totalPages = Math.ceil(filteredTalents.length / itemsPerPage);
    const nextPage =
      direction === "next"
        ? Math.min(currentPage + 1, totalPages)
        : Math.max(currentPage - 1, PAGINATION_CONFIG.DEFAULT_PAGE);

    setCurrentPage(nextPage);
  };

  const handleCardClick = (talent: Talent): void => {
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));
  };

  const handleContactClick = (talent: Talent): void => {
    setSelectedTalent((prevTalent) => (prevTalent === talent ? null : talent));

    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  // Removed renderButtons and renderTalents functions - now handled by separate components

  return (
    <section
      className="h-auto bg-[#f3f6f6] flex flex-col items-center pb-4"
      aria-label={ACCESSIBILITY_CONFIG.ARIA_LABELS.TALENT_POOL}
    >
      <h1 className="text-[#441606] text-center font-dmSerifDisplay text-[36px] md:text-[36px] mt-[85px] mb-[61px] font-[400]">
        DLT Africa Talent Pool
      </h1>

      <SkillFilter
        availableSkills={availableSkills}
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        loading={skillsApi.loading}
      />

      <TalentGrid
        talents={paginatedTalents}
        selectedTalent={selectedTalent}
        loading={talentsApi.loading}
        itemsPerPage={itemsPerPage}
        onCardClick={handleCardClick}
        onContactClick={handleContactClick}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredTalents.length}
        itemsPerPage={itemsPerPage}
        loading={talentsApi.loading}
        onPageChange={handlePageChange}
      />

      {isModalOpen && selectedTalent && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 w-screen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
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
