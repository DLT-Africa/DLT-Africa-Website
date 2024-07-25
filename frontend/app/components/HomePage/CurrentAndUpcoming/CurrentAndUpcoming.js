"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Current1 from "../../../../public/Current1.png";

const CurrentAndUpcoming = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://dlt-backend.vercel.app/api/v1/events/get-all-events`
        );
        setEventData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setMessage("Cannot fetch data");
        } else {
          setMessage("Server error");
        }
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const handleViewMore = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen px-4 flex flex-col items-center justify-center bg-[#f5f3f5] ">
      <h1 className="text-center text-[30px] mb-12 pt-20 xl:text-5xl lg:text-4xl md:text-3xl">
        Past Programmes
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : eventData.length === 0 ? (
        <p>No Event Data...</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-8 lg:mb-20 md:mb-8 sm:mb-16  p-4 ">
          {eventData.map((event) => (
            <div
              className="max-w-xs shadow-lg p-7 rounded-lg border border-orange-300 flex justify-center items-center flex-col w-[500px] lg:w-[600px] gap-4 "
              key={event._id}
            >
              <img
                className="w-20 h-20 rounded-full"
                src="Current1.png"
                alt="eventmedia"
              />

              <div className="mt-4 flex justify-center items-center flex-col gap-3">
                <h3 className="text-xl font-semibold text-neutral-black">
                  {event.eventName}
                </h3>
                <p className="text-sm text-neutral-black">
                  {event.eventCategory} |{" "}
                  <span className="venue">
                    {event.eventVenue.length > 10
                      ? event.eventVenue.substring(0, 8) + "..."
                      : event.eventVenue}
                  </span>
                </p>
                <p className="text-sm text-neutral-black">
                  {event.startDate} | {event.duration}
                </p>
                <button
                  className="mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 text-base font-medium"
                  onClick={() => handleViewMore(event)}
                >
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 w-screen"
          onClick={closeModal}
        >
          <div className="bg-white p-8 rounded-lg w-[350px] flex flex-col gap-2">
            <h2 className="text-2xl font-semibold mb-4">
              Name:{selectedEvent.eventName}
            </h2>
            <div className="flex">
              <p className="font-bold">Category:&nbsp;</p> {selectedEvent.eventCategory}
            </div>
            <div className="flex">
              <p className="font-bold">Start Date:&nbsp;</p> {selectedEvent.startDate}
            </div>
            <div className="flex">
              <p className="font-bold">Duration:&nbsp;</p> {selectedEvent.duration}
            </div>
            <div className="flex">
              <p className="font-bold">Venue:&nbsp;</p> {selectedEvent.eventVenue}
            </div>
            <div>
              <p className="font-bold">Description:&nbsp;</p> {selectedEvent.eventDescription}
            </div>
            <div className="flex">
              <p className="font-bold">Photos:&nbsp;</p>
              <a
                href={selectedEvent.media}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedEvent.media.length > 30
                  ? selectedEvent.media.substring(0, 30) + "..."
                  : selectedEvent.media}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentAndUpcoming;
