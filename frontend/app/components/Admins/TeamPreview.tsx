"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TeamData {
  _id: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  role: string;
  isVerified: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL;

const TeamPreview: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TeamData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>("/team-list");

  const handleButtonClick = (href: string): void => {
    setActiveButton(href);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchTeamData = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/team/team-details`
        );
        // The team API returns the teams array directly (not wrapped in { success: true, data: [...] })
        if (Array.isArray(response.data)) {
          setTeamData(response.data);
        } else {
          setTeamData([]);
          setMessage("Invalid data format received");
        }
      } catch (error: any) {
        console.error("Error fetching team data:", error);
        setTeamData([]);
        if (error.response && error.response.status == 400) {
          setMessage("Cannot fetch data");
          return;
        }
        setMessage("Server error");
      }
      setIsLoading(false);
    };
    fetchTeamData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(teamData)) {
      setSearchResults([]);
      return;
    }
    const filteredTeamData = teamData.filter(
      (res) =>
        res.name?.toLowerCase().includes(search.toLowerCase()) ||
        res.email?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredTeamData);
  }, [teamData, search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
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
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((team: TeamData, index: number) => {
                  const { _id, name, email, photo, phone, role, isVerified } =
                    team;

                  return (
                    <tr key={_id}>
                      <td className="border px-4 py-2">{index + 1}</td>

                      <td className="border px-4 py-2">{name}</td>
                      <td className="border px-4 py-2">{email}</td>

                      <td className="border px-4 py-2">{phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <ul className="flex">
              {Array.from(
                { length: Math.ceil(searchResults.length / itemsPerPage) },
                (_, number) => (
                  <li key={number} className="mr-2">
                    <button
                      onClick={() => paginate(number + 1)}
                      className="px-3 py-1 rounded-md bg-blue-500 text-white"
                    >
                      {number + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamPreview;
