"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formValidMessage, setFormValidMessage] = useState<string>("");
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setFormCompleted(true);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setFormValidMessage("Please enter both email and password.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormValidMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/login`, formData)
      .then((response) => {
        setIsSubmitting(false);
        localStorage.setItem("isLoggedIn", "true");
        setFormCompleted(true);
        router.push("/admin-dashboard");
      })
      .catch((error: any) => {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage("Invalid login credentials.");
          return;
        }

        setFormValidMessage("Server error. Please try again later.");
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="mt-5 mb-20 p-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto lg:min-w-[65%] 2xl:min-w-[50%] lg:max-w-[65%] 2xl:max-w-[50%]"
      >
        <Typography
          className="font-normal md:text-[36px] sm:text-[25px] text-black mb-[39px] text-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Login as an Admin
        </Typography>
        <div className="grid grid-cols-none gap-y-14 text-center">
          <Input
            size="lg"
            type="email"
            name="email"
            variant="static"
            label="Email Address"
            className="pl-4 text-xl"
            labelProps={{ className: "!text-black" }}
            containerProps={{ className: "h-14" }}
            placeholder="yourname@gmail.com"
            value={formData.email}
            onChange={handleChange}
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            size="lg"
            type="password"
            name="password"
            variant="static"
            label="Password"
            className="pl-4 text-xl"
            labelProps={{ className: "!text-black" }}
            containerProps={{ className: "h-14" }}
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="capitalize px-16 py-4 bg-[#FC7C13] my-[35px] w-full text-[16px] transition duration-500 ease-in-out transform hover:-translate-y-1"
          disabled={isSubmitting}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
        {formValidMessage && (
          <div className="text-red-600 mt-4">{formValidMessage}</div>
        )}
        <p className="mt-[10px]">
          Don&apos;t have an account?{" "}
          <Link href="/admin" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
