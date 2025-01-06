import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactModal = ({ onClose }) => {
  const initialState = {
    orgName: "",
    emailAddress: "",
    message: "",
  };

  const [formData, setformData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const { orgName, emailAddress, message } = formData;

      if (!orgName || !emailAddress || !message) {
        toast.error("All fields are required");
      }
      const response = await axios.post(
        "https://dlt-backend.vercel.app/api/v1/contact/contactUs",
        formData
      );

      onClose();
      setIsSubmitting(false);
      setFormCompleted(true);
      setFormValidMessage(
        `Thanks for your message! We will get back to you soon.`
      );
    } catch (error) {
      setIsSubmitting(false);
      setFormCompleted(false);
      setFormValidMessage(
        `${error.response.data.message || "Unable to process your submission"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="h-full shadow-lg opacity-90 bg-blue-gray-100 w-full flex justify-center items-center fixed top-0 left-0 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium"
              onChange={handleChange}
            >
              Message
            </label>
            <textarea
              type="text"
              id="message"
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-white bg-red-500  px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactModal;
