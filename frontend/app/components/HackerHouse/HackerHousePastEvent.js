"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Card,
  Typography,
  Chip,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";

const HackerHousePastEvent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/events/get-all-events"
        );
        setEventData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
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

  const data = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Hackaton",
      value: "hackaton",
    },
    {
      label: "Bootcamp",
      value: "bootcamp",
    },
    {
      label: "Event",
      value: "event",
    },
    {
      label: "Incubator",
      value: "incubator",
    },
  ];

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-full p-3 md:p-[50px] w-full"
    >
      <div>
        <Typography className="text-4xl font-semibold mb-[17px]">
          Past Events
        </Typography>
      </div>

      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none w-[30%]  bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={
                activeTab === value ? "text-gray-900" : "text-gray-400"
              }
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <hr className="mt-5 border-t-1 border-gray-900" />
        <TabsBody>
          <TabPanel key={"all"} value={"all"}>
            <div className="w-full  mostly-customized-scrollbar overflow-auto">
              {isLoading ? (
                <p>Loading...</p>
              ) : eventData.length === 0 ? (
                <p>No past events found.</p>
              ) : (
                <table className="mt-4 w-full min-w-max  table-auto text-left">
                  <tbody>
                    {eventData.map((event, index) => {
                      const {
                        _id,
                        image,
                        eventName,
                        eventCategory,
                        eventDetail,
                        eventType,
                        duration,
                        eventVenue,
                      } = event;
                      const isLast = index === eventData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center gap-3 max-w-[20rem] lg:max-w-[27rem] ">
                              {/* <Avatar src={img} alt={description} size="lg" /> */}
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {eventName}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-medium text-gray-700/70"
                              >
                                {eventDetail.eventDescription}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-medium text-gray-700/70"
                              >
                                {duration}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={eventVenue}
                                className="bg-[#B7FF88] p-2"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={eventType}
                                className="bg-[#B7FF88] p-2"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={eventCategory}
                                className="bg-[#FFDBA9] p-2"
                              />
                            </div>
                          </td>

                          <td className={classes}>
                            <IconButton variant="text" onClick={() => handleViewMore(event)}>
                              <FaArrowRightLong className="h-4 w-4" />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}

                    {isModalOpen && selectedEvent && (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 w-screen ">
                        <div className="bg-white p-8 rounded-lg w-[900px] ">
                          <h2 className="text-2xl font-semibold mb-4">
                            Name:{selectedEvent.eventName}
                          </h2>
                          <p>Category: {selectedEvent.eventCategory}</p>
                          <p>Start Date: {selectedEvent.startDate}</p>
                          <p>Duration: {selectedEvent.duration}</p>
                          <p>Venue: {selectedEvent.eventVenue}</p>
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold">
                              Event Details
                            </h3>
                            <p>
                              Description:{" "}
                              {selectedEvent.eventDetail.eventDescription}
                            </p>
                            <div>
                              Media:
                              <Image
                                src={selectedEvent.eventDetail.media || ""}
                                alt="Event Media"
                                className="w-40 h-40 rounded-lg object-cover"
                                width={400}
                              />
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
                  </tbody>
                </table>
              )}
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </Card>
  );
};

export default HackerHousePastEvent;
