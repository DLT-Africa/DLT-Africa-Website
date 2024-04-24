"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
const BACKEND_URL = process.env.BACKEND_URL
const TeamPreview = () => {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `https://dlt-africa-website.vercel.app/api/v1/team/team-details`
        );

        setTeamData(response.data);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status == 400) {
          setMessage("Cannot fetch data");
        } else {
          setMessage("Server error");
        }
      }
    };
    fetchTeamData();
  }, []);

  useEffect(() => {
    const filteredTeamData = teamData.filter(
      (res) =>
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.email.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredTeamData);
  }, [teamData, search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex mb-4">
        <div className="flex space-x-4">
          <Link
            href="/admin-dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Admission List
          </Link>
          <Link
            href="/team-list"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Team List
          </Link>
          <Link
            href="/event-list"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Event List
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-[#FFF8ED] "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!isLoading && teamData.length === 0 ? (
        <p>No data found...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">S/N</th>
                  {/* <th className="px-4 py-2">Photo</th> */}
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((team, index) => {
                  const { _id, name, email, photo, phone, role, isVerified } =
                    team;

                  return (
                    <tr key={_id}>
                      <td className="border px-4 py-2">{index + 1}</td>

                      <td className="border px-4 py-2">{name}</td>
                      <td className="border px-4 py-2">{email}</td>

                      <td className="border px-4 py-2">{phone}</td>
                      <td className="border px-4 py-2">{role}</td>
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

export default TeamPreview;
