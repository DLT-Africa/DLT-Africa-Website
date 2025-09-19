"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ChangeStatus from "@/app/components/ChangeStatus/ChangeStatus";

const AdminDashboard = () => {
  const [activeButton, setActiveButton] = useState("/admin-dashboard");
  const handleButtonClick = (href) => {
    setActiveButton(href);
  };

  const [admissionData, setAdmissionData] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get(
          `https://dlt-backend.vercel.app/api/v1/cohorts/get-all-admissions`
        );

        setAdmissionData(response.data);
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
    fetchAdmissions();
  }, []);

  useEffect(() => {
    const filteredAdmission = admissionData.filter(
      (res) =>
        res.firstName.toLowerCase().includes(search.toLowerCase()) ||
        res.classType.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredAdmission);
  }, [admissionData, search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-full p-3 md:p-[50px] w-full">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

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
              activeButton === "/corpers"
                ? "bg-pink-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Corper&apos;s List
          </Link>
          <Link
            href="/waitlist"
            onClick={() => handleButtonClick("/waitlist")}
            className={`px-4 py-2 rounded-md ${
              activeButton === "/waitlist"
                ? "bg-[#FC7C13] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Waitlist
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

      {!isLoading && admissionData.length === 0 ? (
        <p>No admission data found...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">S/N</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Update Status</th>
                  <th className="px-4 py-2">Course Selected</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Class Type</th>
                  <th className="px-4 py-2" title="payment status">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((admission, index) => {
                  const {
                    _id,
                    firstName,
                    phoneNo,
                    courseSelected,
                    classType,
                    emailAddress,
                    status,
                    lastName,
                  } = admission;

                  return (
                    <tr key={_id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {firstName} &nbsp;{lastName}
                      </td>
                      <td className="border px-4 py-2">{emailAddress}</td>
                      <td className="border px-4 py-2">
                        <ChangeStatus id={_id} />
                      </td>
                      <td className="border px-4 py-2">{courseSelected}</td>
                      <td className="border px-4 py-2">{phoneNo}</td>
                      <td className="border px-4 py-2">{classType}</td>
                      <td className="border px-4 py-2">{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <ul className="flex">
              {[
                ...Array(Math.ceil(searchResults.length / itemsPerPage)).keys(),
              ].map((number) => (
                <li key={number} className="mr-2">
                  <button
                    onClick={() => paginate(number + 1)}
                    className="px-3 py-1 rounded-md bg-blue-500 text-white"
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
