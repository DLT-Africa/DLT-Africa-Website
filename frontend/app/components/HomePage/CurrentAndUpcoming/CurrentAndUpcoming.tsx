"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  _id: string;
  eventName: string;
  eventVenue: string;
  eventCategory: string;
  startDate: string;
  duration: string;
  eventDescription: string;
  media: string;
}

const CurrentAndUpcoming: React.FC = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
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
        setMessage(
          error.response && error.response.status === 400
            ? "Cannot fetch data"
            : "Server error"
        );
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
      return;
    }

    document.body.classList.remove("overflow-hidden");

    // Cleanup function to restore scroll when component unmounts
    return () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [isModalOpen]);

  const handleViewMore = (event: Event): void => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen px-4 flex flex-col items-center justify-center bg-[#f5f3f5]">
      <h1 className="text-center text-[30px] mb-12 pt-20 xl:text-5xl lg:text-4xl md:text-3xl">
        Past Programmes
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : !Array.isArray(eventData) || eventData.length === 0 ? (
        <p>{message || "No Event Data..."}</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-8 lg:mb-20 md:mb-8 sm:mb-16 p-4">
          {eventData.map((event: Event) => (
            <div
              className="max-w-xs shadow-lg p-7 rounded-lg border border-orange-300 flex justify-center items-center flex-col w-[500px] lg:w-[600px] gap-4"
              key={event._id}
            >
              <img
                className="w-20 h-20 rounded-full"
                src="/images/Current1.png"
                alt="photos"
                loading="lazy"
              />
              <div className="mt-4 flex justify-center items-center flex-col gap-3">
                <h3 className="text-xl font-semibold text-neutral-black capitalize">
                  {event.eventName}
                </h3>
                <p className="text-sm text-neutral-black text-center capitalize">
                  {event.eventVenue}
                </p>
                <p className="text-sm text-neutral-black capitalize">
                  {event.eventCategory}
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
          className="fixed inset-0 w-screen h-full flex justify-center items-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-[90%] max-w-2xl flex flex-col gap-4 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Name: {selectedEvent.eventName}
            </h2>
            <p>
              <span className="font-bold">Category:</span>{" "}
              {selectedEvent.eventCategory}
            </p>
            <p>
              <span className="font-bold">Start Date:</span>{" "}
              {selectedEvent.startDate}
            </p>
            <p>
              <span className="font-bold">Duration:</span>{" "}
              {selectedEvent.duration}
            </p>
            <p>
              <span className="font-bold">Venue:</span>{" "}
              {selectedEvent.eventVenue}
            </p>
            <p>
              <span className="font-bold">Description:</span>{" "}
              {selectedEvent.eventDescription}
            </p>
            <p className="flex">
              <span className="font-bold">Photos:</span>
              <a
                href={selectedEvent.media}
                className="text-blue-500 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedEvent.media.length > 30
                  ? selectedEvent.media.substring(0, 30) + "..."
                  : selectedEvent.media}
              </a>
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={closeModal}
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
