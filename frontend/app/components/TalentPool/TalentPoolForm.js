"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Input } from "@material-tailwind/react";
import Loader from "@/app/components/Application/Loader";

const NewForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    calendlylink: "",
    companyName: "",
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

    const { email, calendlylink, companyName } = formData;

    if (!email || !calendlylink || !companyName) {
      setFormValidMessage("Oops! all fields are required");
      return;
    }
    setIsSubmitting(true);

    axios
      .post(`https://dlt-backend.vercel.app/api/v1/some-endpoint`, formData)
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        router.push("/some-success-page");
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFormValidMessage("Server error unable to process your submission");
      });
  };

  return (
    <div className="border">

    <div className="w-full max-w-lg px-4 py-8 md:px-8 md:py-10 rounded-lg mx-auto">
      <div className="px-4 md:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-6 text-center">
            <div>
              <Input
                size="lg"
                type="email"
                name="email"
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                size="lg"
                type="text"
                name="calendlylink"
                variant="static"
                label="Calendly link"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14",
                }}
                placeholder="http//calendly/schedule/create-meeting"
                value={formData.calendlylink}
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
                placeholder="DLT Africa"
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
              {isSubmitting ? <Loader /> : <span>Submit</span>}
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
    </div>
  );
};

export default NewForm;
