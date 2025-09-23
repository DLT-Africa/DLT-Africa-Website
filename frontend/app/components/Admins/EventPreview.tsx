"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import EditEventPage from "@/app/components/Admins/EditEvent";

interface EventData {
  _id: string;
  image: string;
  eventName: string;
  eventCategory: string;
  startDate: string;
  duration: string;
  eventVenue: string;
}

const EventPreview: React.FC = () => {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<EventData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("/event-list");

  const handleButtonClick = (href: string): void => {
    setActiveButton(href);
  };

  const handleCloseModal = (): void => {
    setSelectedEventId(null);
    setIsModalOpen(false);
  };

  const handleEditEvent = (eventId: string): void => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const router = useRouter();
  const handleDelete = async (eventId: string): Promise<void> => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/delete/${eventId}`
      );
      if (Array.isArray(eventData)) {
        setEventData(eventData.filter((event) => event._id !== eventId));
      }
      setMessage("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      setMessage("Error deleting event");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/get-all-events`
        );
        if (
          response.data &&
          response.data.success &&
          Array.isArray(response.data.data)
        ) {
          setEventData(response.data.data);
        } else {
          setEventData([]);
          setMessage("Invalid data format received");
        }
      } catch (error: any) {
        console.error("Error fetching events:", error);
        setEventData([]);
        if (error.response && error.response.status == 400) {
          setMessage("Cannot fetch data");
          return;
        }
        setMessage("Server error");
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!Array.isArray(eventData)) {
      setSearchResults([]);
      return;
    }
    const filteredEvents = eventData.filter(
      (res) =>
        res.eventVenue?.toLowerCase().includes(search.toLowerCase()) ||
        res.eventCategory?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredEvents);
  }, [eventData, search]);

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
                ? "bg-pink-800 text-white"
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
                ? "bg-red-500 text-white"
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
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Venue</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((event: EventData, index: number) => {
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
                    <div className="modal z-40">
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
              {Array.from(
                { length: Math.ceil(searchResults.length / itemsPerPage) },
                (_, number) => (
                  <li key={number} className="mr-2">
                    <button
                      onClick={() => paginate(number + 1)}
                      className="bg-[#FC7C13] p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
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

export default EventPreview;
