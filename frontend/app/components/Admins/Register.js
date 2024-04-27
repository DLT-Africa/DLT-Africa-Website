"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button, Input, Typography } from "@material-tailwind/react";
import Loader from "@/app/components/Application/Loader";
const BACKEND_URL = process.env.BACKEND_URL
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

    const { name, email, password, phone } = formData;

    if (!name || !email || !password || !phone) {
      setFormValidMessage("Oops! all fields are required");
      return;
    }
    setIsSubmitting(true);

    axios
      .post(`https://dlt-website-backend.vercel.app/api/v1/team/register-team`, formData)
      .then(function (response) {
        console.log(response.data);
        console.log(formData);
        setIsSubmitting(false);
        localStorage.setItem("isLoggedIn", "true");
        setFormCompleted(true);
        router.push("/admin-dashboard");
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
        <Typography className="font-normal md:text-[36px] sm:text-[25px] text-black mb-[39px] text-center ">
          Register as an Admin
        </Typography>
        {!formCompleted ? (
          <form
            onSubmit={handleSubmit}
            className=" rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto lg:min-w-[65%] 2xl:min-w-[50%] lg:max-w-[65%] 2xl:max-w-[50%]  "
          >
            <div className="grid grid-cols-none md:grid-cols-none gap-y-14 gap-x-14 text-center">
              <Input
                size="lg"
                name="firstName"
                variant="static"
                label="First Name"
                className="pl-4 text-xl"
                labelProps={{
                  className: "!text-black",
                }}
                containerProps={{
                  className: "h-14 ",
                }}
                placeholder="First Name"
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
                  className: "h-14 ",
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
                  className: "h-14 ",
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
                  className: "h-14 ",
                }}
                placeholder="08123456789"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              size="large"
              className="capitalize px-16 py-4 bg-[#FC7C13] my-[35px] w-full text-[16px] transition duration-500 ease-in-out transform hover:-translate-y-1 "
            >
              {isSubmitting ? <Loader /> : <span>Register</span>}
            </Button>
            {formValidMessage && (
              <div className="event-page-registration-error-message">
                {formValidMessage}
              </div>
            )}

            <p className="mt-[10px] ">
              Already have an account?{" "}
              <Link href="/admin-login" className="underline">
                Login
              </Link>
            </p>
          </form>
        ) : (
          <div>
            <Link href="/">Dismiss</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
