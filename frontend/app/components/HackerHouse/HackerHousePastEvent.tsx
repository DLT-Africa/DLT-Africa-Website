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
import { Card, Typography, Chip, IconButton } from "@material-tailwind/react";

interface Event {
  _id: string;
  image: string;
  eventName: string;
  eventCategory: string;
  eventDescription: string;
  eventType: string;
  duration: string;
  eventVenue: string;
  startDate: string;
  media: string;
}

interface TabData {
  label: string;
  value: string;
}

const HackerHousePastEvent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [eventData, setEventData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventData([]);
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleViewMore = (event: Event): void => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const data: TabData[] = [
    {
      label: "All",
      value: "all",
    },
  ];

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-full p-3 md:p-[50px] w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div>
        <Typography
          className="text-4xl font-semibold mb-[17px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
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
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={
                activeTab === value ? "text-gray-900" : "text-gray-400"
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <hr className="mt-5 border-t-1 border-gray-900" />
        <TabsBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TabPanel key={"all"} value={"all"}>
            <div className="w-full  mostly-customized-scrollbar overflow-auto">
              {isLoading ? (
                <p>Loading...</p>
              ) : eventData.length === 0 ? (
                <p>No past events found.</p>
              ) : (
                <table className="mt-4 w-full min-w-max  table-auto text-left">
                  <tbody>
                    {eventData.map((event: Event, index: number) => {
                      const {
                        _id,
                        image,
                        eventName,
                        eventCategory,
                        eventDescription,
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
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {eventName}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-medium text-black-700 w-[250px] "
                                title={eventDescription}
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {eventDescription}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-medium text-gray-700/70"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
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
                            <IconButton
                              variant="text"
                              onClick={() => handleViewMore(event)}
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              <FaArrowRightLong className="h-4 w-4" />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}

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
                            <p className="font-bold">Category:&nbsp;</p>{" "}
                            {selectedEvent.eventCategory}
                          </div>
                          <div className="flex">
                            <p className="font-bold">Start Date:&nbsp;</p>{" "}
                            {selectedEvent.startDate}
                          </div>
                          <div className="flex">
                            <p className="font-bold">Duration:&nbsp;</p>{" "}
                            {selectedEvent.duration}
                          </div>
                          <div className="flex">
                            <p className="font-bold">Venue:&nbsp;</p>{" "}
                            {selectedEvent.eventVenue}
                          </div>
                          <div>
                            <p className="font-bold">Description:&nbsp;</p>{" "}
                            {selectedEvent.eventDescription}
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
