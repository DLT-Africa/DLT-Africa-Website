"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Input } from "@material-tailwind/react";

const URL = "https://talent-pool-server.vercel.app";
// const URL = "http://localhost:5000";

const NewForm = ({ selectedTalent, handleCloseModal }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailAddress: "",
    calendlyLink: "",
    companyName: "",
    talentId: selectedTalent._id,
  });
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { emailAddress, calendlyLink, companyName } = formData;

    if (!emailAddress || !calendlyLink || !companyName) {
      setFormValidMessage("Oops! All fields are required");
      return;
    }
    setIsSubmitting(true);

    axios
      .post(`${URL}/api/v1/contact/create-form`, formData)
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        handleCloseModal();
        router.push("/talent-pool");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        if (error.response) {
          setFormValidMessage(
            `Server error: ${
              error.response.data.message || "Unable to process your submission"
            }`
          );
        } else if (error.request) {
          setFormValidMessage(
            "No response from server. Please try again later."
          );
        } else {
          setFormValidMessage("Request setup error: " + error.message);
        }
      });
  };

  return (
    <div className="w-full md:w-[800px]  px-4 py-8 md:px-8 md:py-10 rounded-lg ">
      <div className="bg-white p-8 rounded-lg w-full flex flex-col gap-2 relative">
        <button
          className="absolute top-0 right-[10px] text-orange-600 text-[25px] "
          onClick={handleCloseModal}
        >
          X
        </button>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold mb-4">
            {selectedTalent.fullName}
          </p>
          <p className="text-2xl font-semibold mb-4 capitalize">
            Major: {selectedTalent.role}
          </p>
        </div>

        <code className="text-black my-2">Fill the form below</code>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-6 text-center">
            <div>
              <Input
                size="lg"
                type="email"
                name="emailAddress"
                variant="static"
                label="Email Address"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14",
                }}
                placeholder="Alexander@dltafrica.io"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                size="lg"
                type="text"
                name="calendlyLink"
                variant="static"
                label="Calendly link"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14",
                }}
                placeholder="https://calendly/schedule/create-meeting"
                value={formData.calendlyLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                size="lg"
                type="text"
                name="companyName"
                variant="static"
                label="Company Name"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14",
                }}
                placeholder="company or individual name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              size="lg"
              className="capitalize bg-[#FC7C13] mx-auto w-full max-w-xs h-14 text-lg"
            >
              {isSubmitting ? "Submitting..." : <span>Submit</span>}
            </Button>
          </div>
          {formValidMessage && (
            <div className="event-page-registration-error-message mt-4 text-red-500">
              {formValidMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewForm;
