import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { PAGINATION_CONFIG, ACCESSIBILITY_CONFIG } from "./constants";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  onPageChange: (direction: "next" | "prev") => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  loading,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === PAGINATION_CONFIG.DEFAULT_PAGE;
  const isLastPage = currentPage * itemsPerPage >= totalItems;

  return (
    <div
      className="flex justify-between px-[10px] w-full max-w-[800px] mt-4"
      role="group"
      aria-label={ACCESSIBILITY_CONFIG.ARIA_LABELS.PAGINATION}
    >
      <button
        onClick={() => onPageChange("prev")}
        className={`${
          isFirstPage || loading ? "opacity-50 cursor-not-allowed" : ""
        } bg-[#C54809] text-white font-medium p-2 rounded`}
        disabled={isFirstPage || loading}
        aria-label="Go to previous page"
      >
        <IoIosArrowBack />
      </button>

      <span
        className="flex items-center text-[#C54809] font-medium"
        aria-live="polite"
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange("next")}
        className={`${
          isLastPage || loading ? "opacity-50 cursor-not-allowed" : ""
        } bg-[#C54809] text-white font-medium p-2 rounded`}
        disabled={isLastPage || loading}
        aria-label="Go to next page"
      >
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
