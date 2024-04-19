"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import Current1 from "../../../../public/Current1.png";

const CurrentAndUpcoming = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/events/get-all-events"
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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-4xl mb-12 pt-20 xl:text-5xl lg:text-4xl md:text-3xl">
        Current and Upcoming Programmes.
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : eventData.length === 0 ? (
        <p>No Event Data...</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-8 lg:mb-20 md:mb-8 sm:mb-16">
          {eventData.map((event, index) => (
            <div
              className="max-w-xs shadow-lg p-5 rounded-lg border border-orange-300 flex justify-center items-center flex-col"
              key={event._id}
            >
              <Image
                className="w-20 h-20 rounded-full"
                src={Current1}
                alt="eventmedia"
              />

              <div className="mt-4 flex justify-center items-center flex-col">
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
                <button className="mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 text-orange-500 bg-secondary-700 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none border border-orange-500 text-base font-medium">
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentAndUpcoming;
