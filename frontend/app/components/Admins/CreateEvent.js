"use client";

import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import Loader from "@/app/components/Application/Loader";
import axios from "axios";

import AdminDashboard from "./AdminDashboard";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    image: "",
    eventName: "",
    eventCategory: "",
    startDate: "",
    duration: "",
    eventDescription: "",
    eventRegLink: "",
    eventVenue: "",
  });

  const [formValidMessage, setFormValidMessage] = useState();
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
    } = formData;

    if (
      !image ||
      !eventName ||
      !eventCategory ||
      !startDate ||
      !duration ||
      !eventDescription ||
      !eventRegLink ||
      !eventVenue
    ) {
      setFormValidMessage(
        "Oops! required field are not filled. Go back and fill them"
      );
      return;
    }
    setIsSubmitting(true);

    axios
      .post("http://localhost:5000/api/v1/events/create-event", formData)
      .then(function (response) {
        console.log(response.data);
        console.log(formData);
        setIsSubmitting(false);
        setFormCompleted(true);
      })
      .catch(function (error) {
        setIsSubmitting(false);
        if (error.response && error.response.status == 400) {
          setFormValidMessage(
            "Applicant with the same email address already exist"
          );
        } else {
          setFormValidMessage(
            "Server error unable to process your registration"
          );
        }
      });
  };

  return (
    <div>
      <div className="mt-5 mb-20 p-4">
        <Typography className="font-normal text-[36px] text-black mb-[39px] text-center ">
          Create an event
        </Typography>
        {!formCompleted ? (
          //lg:min-w-[75%] 2xl:min-w-[70%] lg:max-w-[75%] 2xl:max-w-[70%]
          <form
            onSubmit={handleSubmit}
            className="w-full lg:min-w-[75%] 2xl:min-w-[70%] lg:max-w-[75%] 2xl:max-w-[70%]  rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-14 text-center">
              <Input
                size="lg"
                type="text"
                name="eventName"
                variant="static"
                label="Event Name"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="OSCAFEST"
                value={formData.eventName}
                onChange={handleChange}
              />
              <Input
                size="lg"
                type="text"
                name="eventCategory"
                variant="static"
                label="Event Type"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="Offline"
                value={formData.eventCategory}
                onChange={handleChange}
              />
              <Input
                type="text"
                size="lg"
                name="eventVenue"
                variant="static"
                label="Venue"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="London"
                value={formData.eventVenue}
                onChange={handleChange}
              />
              <Input
                type="date"
                size="lg"
                name="startDate"
                variant="static"
                label="Date"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder=""
                value={formData.startDate}
                onChange={handleChange}
              />
              <Input
                type="text"
                size="lg"
                name="eventRegLink"
                variant="static"
                label="Registration Link"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="paste the google form link"
                value={formData.eventRegLink}
                onChange={handleChange}
              />
              <Input
                type="text"
                size="lg"
                name="duration"
                variant="static"
                label="Duration"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="1 week"
                value={formData.duration}
                onChange={handleChange}
              />
              <Input
                type="text"
                size="lg"
                name="eventDescription"
                variant="static"
                label="Description"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="A brief description of the event"
                value={formData.eventDescription}
                onChange={handleChange}
              />
              <Input
                type="file"
                size="lg"
                name="image"
                variant="static"
                label="Image"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="1 week"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              size="large"
              className="capitalize px-16 py-4 bg-[#FC7C13] my-[35px] w-full text-[16px] transition duration-500 ease-in-out transform hover:-translate-y-1 "
            >
              {isSubmitting ? <p>Loading...</p> : <span>Add Event</span>}
            </Button>
            {formValidMessage && (
              <div className="event-page-registration-error-message">
                {formValidMessage}
              </div>
            )}
          </form>
        ) : (
          <div>
            <AdminDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
