"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button, Input, Typography } from "@material-tailwind/react";
import Loader from "@/app/components/Application/Loader";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setFormCompleted(true);
    }
  }, []);

  const [formValidMessage, setFormValidMessage] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
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

    const { name, email, password, phone } = formData;

    if (!name || !email || !password || !phone) {
      setFormValidMessage("Oops! All fields are required.");
      return;
    }

    // Add additional client-side validation here if necessary

    setIsSubmitting(true);

    axios
      .post(
        `https://dlt-backend.vercel.app/api/v1/team/register-team`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        localStorage.setItem("isLoggedIn", "true");
        setFormCompleted(true);
        router.push("/admin-dashboard");
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage(
            "An applicant with the same email address already exists."
          );
        } else {
          setFormValidMessage(
            "Server error. Unable to process your registration."
          );
        }
      });
  };

  return (
    <div className="mt-5 mb-20 p-4">
      <Typography className="font-normal md:text-[36px] sm:text-[25px] text-black mb-[39px] text-center">
        Register as an Admin
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto lg:min-w-[65%] 2xl:min-w-[50%] lg:max-w-[65%] 2xl:max-w-[50%]"
      >
        <div className="grid grid-cols-none md:grid-cols-none gap-y-14 gap-x-14 text-center">
          <Input
            size="lg"
            name="name"
            variant="static"
            label="Name"
            className="pl-4 text-xl"
            labelProps={{
              className: "!text-black",
            }}
            containerProps={{
              className: "h-14",
            }}
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
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
            placeholder="yourname@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            size="lg"
            name="password"
            variant="static"
            label="Password"
            className="pl-4 text-xl"
            labelProps={{
              className: "!text-black",
            }}
            containerProps={{
              className: "h-14",
            }}
            placeholder=""
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            size="lg"
            type="text"
            name="phone"
            variant="static"
            label="Phone Number"
            className="pl-4 text-xl"
            labelProps={{
              className: "!text-black",
            }}
            containerProps={{
              className: "h-14",
            }}
            placeholder="08123456789"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          size="large"
          className="capitalize px-16 py-4 bg-[#FC7C13] my-[35px] w-full text-[16px] transition duration-500 ease-in-out transform hover:-translate-y-1"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>
        {formValidMessage && (
          <div className="event-page-registration-error-message text-red-600 mt-4">
            {formValidMessage}
          </div>
        )}

        <p className="mt-[10px]">
          Already have an account?{" "}
          <Link href="/admin-login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
