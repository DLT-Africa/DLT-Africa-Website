"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ChangeStatus from "@/app/components/ChangeStatus/ChangeStatus";
import { useRouter } from "next/navigation";
const BACKEND_URL = process.env.BACKEND_URL;
const AdminDashboard = () => {
  const router = useRouter();

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
          `https://dlt-website-backend.vercel.app/api/v1/cohorts/get-all-admissions`
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
          <Link href="/admin-dashboard" className="bg-blue-500 text-[#fff] px-4 py-2 rounded-md">
            Admission List
          </Link>
          <Link href="/team-list" className="bg-green-500 text-[#fff] px-4 py-2 rounded-md">
            Team List
          </Link>
          <Link href="/event-list" className="bg-red-500 text-[#fff] px-4 py-2 rounded-md">
            Event List
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
        <p>No user found...</p>
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
                  <th className="px-4 py-2">DOB</th>
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
                    academicQualification,
                    courseSelected,
                    classType,
                    dob,
                    emailAddress,
                    status,
                  } = admission;

                  return (
                    <tr key={_id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{firstName}</td>
                      <td className="border px-4 py-2">{emailAddress}</td>
                      <td className="border px-4 py-2">
                        <ChangeStatus id={_id} />
                      </td>
                      <td className="border px-4 py-2">{courseSelected}</td>
                      <td className="border px-4 py-2">{dob}</td>
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
