"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const cloud_name = "dsblhzcka";
const upload_preset = "ktpngqgl";
const BACKEND_URL = process.env.BACKEND_URL
const EditEventPage = ({ eventId, onClose }) => {
  const [eventImage, setEventImage] = useState(null);

  const [formData, setFormData] = useState({
    _id: "",
    eventName: "",
    eventCategory: "",
    startDate: "",
    duration: "",
    eventRegLink: "",
    eventVenue: "",

    media: "",
    eventDescription: "",
  });

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `https://dlt-africa-website.vercel.app/api/v1/events/get-single-event/${eventId}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const updateResponse = await axios.patch(
        `https://dlt-africa-website.vercel.app/api/v1/events/update-event/${eventId}`,
        formData
      );

      console.log("Event updated:", updateResponse.data);
      onClose()
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="eventName" className="block mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventCategory" className="block mb-2">
            Event Category
          </label>
          <input
            type="text"
            id="eventCategory"
            name="eventCategory"
            value={formData.eventCategory}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventType" className="block mb-2">
            Event Type
          </label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block mb-2">
            Event Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="media" className="block mb-2">
            Media (Google Drive Link)
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={formData.media}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-[100%] bg-green-400 p-[10px] rounded my-[5px] flex items-center justify-center text-[16px] font-poppins text-[#fff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
