import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  orgName: string;
  emailAddress: string;
  message: string;
}

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const initialState: FormData = {
    orgName: "",
    emailAddress: "",
    message: "",
  };

  const [formData, setformData] = useState<FormData>(initialState);
  const [formValidMessage, setFormValidMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formCompleted, setFormCompleted] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const { orgName, emailAddress, message } = formData;

      if (!orgName || !emailAddress || !message) {
        toast.error("All fields are required");
        return;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/contactUs`,
        formData
      );

      onClose();
      setIsSubmitting(false);
      setFormCompleted(true);
      setFormValidMessage(
        `Thanks for your message! We will get back to you soon.`
      );
    } catch (error: any) {
      setIsSubmitting(false);
      setFormCompleted(false);
      setFormValidMessage(
        `${
          error.response?.data?.message || "Unable to process your submission"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="h-full shadow-xl  bg-green-50 opacity-[0.98] w-full flex justify-center items-center fixed top-0 left-0 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
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
