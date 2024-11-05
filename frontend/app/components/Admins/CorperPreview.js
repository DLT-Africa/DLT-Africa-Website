"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CorperPreview = () => {
  const [corperData, setCorperData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("/corpers");
  const handleButtonClick = (href) => {
    setActiveButton(href);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dlt-backend.vercel.app/api/v1/cohorts/get-all-corpers`
        );

        setCorperData(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status == 400) {
          setMessage("Cannot fetch data");
        } else {
          setMessage("Server error");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = corperData.filter(
      (res) =>
        res.batchResumption.toLowerCase().includes(search.toLowerCase()) ||
        res.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [corperData, search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Corper&apos;s List</h1>

      <div className="flex mb-4">
        <div className="flex space-x-4">
          <Link
            href="/admin-dashboard"
            onClick={() => handleButtonClick("/admin-dashboard")}
            className={`px-4 py-2 rounded-md ${
              activeButton === "/admin-dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admission List
          </Link>
          <Link
            href="/team-list"
            onClick={() => handleButtonClick("/team-list")}
            className={`px-4 py-2 rounded-md ${
              activeButton === "/team-list"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Team List
          </Link>
          <Link
            href="/event-list"
            onClick={() => handleButtonClick("/event-list")}
            className={`px-4 py-2 rounded-md ${
              activeButton === "/event-list"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Event List
          </Link>
          <Link
            href="/corpers"
            onClick={() => handleButtonClick("/corpers")}
            className={`px-4 py-2 rounded-md ${
              activeButton === "/event-list"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Corper&apos;s List
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-[#FFF8ED]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!isLoading && corperData.length === 0 ? (
        <p>No corper&apos;s data found...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">S/N</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Course Selected</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Batch</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((corper, index) => {
                  const {
                    fullName,
                    emailAddress,
                    phone_number,
                    gender,
                    stateOfOrigin,
                    corp_id,
                    course_selected,
                    batchResumption,
                  } = corper;

                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{fullName}</td>
                      <td className="border px-4 py-2">{emailAddress}</td>

                      <td className="border px-4 py-2">{course_selected}</td>
                      <td className="border px-4 py-2">{phone_number}</td>

                      <td className="border px-4 py-2">{batchResumption}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CorperPreview;
