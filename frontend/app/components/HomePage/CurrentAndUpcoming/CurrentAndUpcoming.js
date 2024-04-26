"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Current1 from "../../../../public/Current1.png";
// const BACKEND_URL = process.env.BACKEND_URL
// console.log(BACKEND_URL)
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
          `https://dlt-website-backend.vercel.app/api/v1/events/get-all-events`
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
    <div className="w-screen px-4 flex flex-col items-center justify-center  bg-[#f5f3f5] ">
      <h1 className="text-center text-[30px] mb-12 pt-20 xl:text-5xl lg:text-4xl md:text-3xl">
        Current and Upcoming Programmes.
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : eventData.length === 0 ? (
        <p>No Event Data...</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-8 lg:mb-20 md:mb-8 sm:mb-16  p-4 ">
          {eventData.map((event) => (
            <div
              className="max-w-xs shadow-lg p-7 rounded-lg border border-orange-300 flex justify-center items-center flex-col w-[500px] lg:w-[600px] gap-4 duration-500 ease-in-out transform hover:-translate-y-1"
              key={event._id}
            >
              <Image
                className="w-20 h-20 rounded-full"
                src={Current1}
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 w-screen ">
          <div className="bg-white p-8 rounded-lg w-[350px] ">
            <h2 className="text-2xl font-semibold mb-4">
              Name:{selectedEvent.eventName}
            </h2>
            <p>Category: {selectedEvent.eventCategory}</p>
            <p>Start Date: {selectedEvent.startDate}</p>
            <p>Duration: {selectedEvent.duration}</p>
            <p>Venue: {selectedEvent.eventVenue}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <p>Description: {selectedEvent.eventDescription}</p>
              <div>
                Media:
                <a href={selectedEvent.media}>{selectedEvent.media}</a>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-[100%] bg-orange-500 rounded-lg p-2 transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentAndUpcoming;
