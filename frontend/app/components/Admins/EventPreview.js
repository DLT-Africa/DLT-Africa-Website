"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import EditEventPage from "@/app/components/Admins/EditEvent";
const BACKEND_URL = process.env.BACKEND_URL
const EventPreview = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("/event-list");
  const handleButtonClick = (href) => {
    setActiveButton(href);
  };

  const handleCloseModal = () => {
    setSelectedEventId(null);
    setIsModalOpen(false);
  };

  const handleEditEvent = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const router = useRouter();
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(
        `https://dlt-website-backend.vercel.app/api/v1/events/delete/${eventId}`
      );
      setEventData(eventData.filter((event) => event._id !== eventId));
      setMessage("Event deleted successfully");
    } catch (error) {
      setMessage("Error deleting event");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://dlt-website-backend.vercel.app/api/v1/events/get-all-events`
        );

        setEventData(response.data);
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
    fetchEvents();
  }, []);

  useEffect(() => {
    const filteredEvents = eventData.filter(
      (res) =>
        res.eventName.toLowerCase().includes(search.toLowerCase()) ||
        res.eventVenue.toLowerCase().includes(search.toLowerCase()) ||
        res.eventCategory.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredEvents);
  }, [eventData, search]);

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
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-[#FFF8ED]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!isLoading && eventData.length === 0 ? (
        <p>No event found...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full ">
              <thead>
                <tr>
                  <th className="px-4 py-2">S/N</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Venue</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((event, index) => {
                  const {
                    _id,
                    image,
                    eventName,
                    eventCategory,
                    startDate,
                    duration,
                    eventVenue,
                  } = event;

                  return (
                    <tr key={_id}>
                      <td className="border px-4 py-2">{index + 1}</td>

                      <td className="border px-4 py-2">{eventName}</td>
                      <td className="border px-4 py-2">{eventCategory}</td>

                      <td className="border px-4 py-2">{startDate}</td>
                      <td className="border px-4 py-2">{duration}</td>
                      <td className="border px-4 py-2">{eventVenue}</td>
                      <button
                        onClick={() => handleEditEvent(_id)}
                        className="bg-green-500 p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="bg-red-500 p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
                      >
                        <AiFillDelete />
                      </button>
                    </tr>
                  );
                })}

                {selectedEventId && (
                  <div>
                    <div className="overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                      <button
                        onClick={handleCloseModal}
                        className="p-2 text-[#fff] bg-red-500 t-[20px] mt-1 "
                      >
                        X
                      </button>
                      <EditEventPage
                        eventId={selectedEventId}
                        onClose={handleCloseModal}
                      />
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>

          <div className="my-[12px] w-[100%] flex items-center justify-center">
            <Link
              href="/event-creation"
              className="w-[353px] bg-[#FC7C13] p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
            >
              Add Event
            </Link>
          </div>
          <div className="mt-4">
            <ul className="flex">
              {[
                ...Array(Math.ceil(searchResults.length / itemsPerPage)).keys(),
              ].map((number) => (
                <li key={number} className="mr-2">
                  <button
                    onClick={() => paginate(number + 1)}
                    className="bg-[#FC7C13] p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
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

export default EventPreview;
