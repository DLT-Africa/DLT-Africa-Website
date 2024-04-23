"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const cloud_name = "dsblhzcka";
const upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;

const EditEventPage = ({ eventId }) => {
  const [eventImage, setEventImage] = useState(null);

  const [formData, setFormData] = useState({
    _id: "",
    eventName: "",
    eventCategory: "",
    startDate: "",
    duration: "",
    eventRegLink: "",
    eventVenue: "",
    eventDetail: {
      media: [],
      eventDescription: "",
    },
  });

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/events/get-single-event/${eventId}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageURL = null;

      if (eventImage !== null) {
        const formData = new FormData();
        formData.append("file", eventImage);
        formData.append("upload_preset", upload_preset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.secure_url;
      }

      const updatedFormData = {
        ...formData,
        eventDetail: {
          ...formData.eventDetail,
          media: imageURL ? [imageURL] : formData.eventDetail.media,
        },
      };

      const updateResponse = await axios.put(
        `http://localhost:5000/api/v1/events/update-event/${eventId}`,
        updatedFormData
      );

      console.log("Event updated:", updateResponse.data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name.startsWith("eventDetail.")) {
      setFormData({
        ...formData,
        eventDetail: {
          ...formData.eventDetail,
          [e.target.name.split(".")[1]]: e.target.value,
        },
      });
    } else if (e.target.name === "eventDetail.media") {
      setEventImage(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
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
          <label htmlFor="eventDetail.eventDescription" className="block mb-2">
            Event Description
          </label>
          <textarea
            id="eventDetail.eventDescription"
            name="eventDetail.eventDescription"
            value={formData.eventDetail.eventDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDetail.media" className="block mb-2">
            Media
          </label>
          <input
            type="file"
            id="eventDetail.media"
            name="eventDetail.media"
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
