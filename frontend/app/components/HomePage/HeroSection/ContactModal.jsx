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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const { orgName, emailAddress, message } = formData;

      if (!orgName || !emailAddress || !message) {
        toast.error("All fields are required");
        return;
      }
      const response = await axios.post(
        "https://dlt-backend.vercel.app/api/v1/contact/contactUs",
        formData
      );
      console.log(response.data);

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
    <section className="h-full shadow-lg  bg-green-50 opacity-95 w-full flex justify-center items-center fixed top-0 left-0 z-50">
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
              name="orgName"
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
              value={formData.orgName}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="emailAddress"
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
              value={formData.emailAddress}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium"
            >
              Message
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
              value={formData.message}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-white bg-red-500  px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
        {!formCompleted && formValidMessage && (
          <p className="text-red-500">{formValidMessage}</p>
        )}
        {formCompleted && <p className="text-green-500">{formValidMessage}</p>}
      </div>
    </section>
  );
};

export default ContactModal;
