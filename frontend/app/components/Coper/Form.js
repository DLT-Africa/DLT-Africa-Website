"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import {  Button } from "@material-tailwind/react";
import Loader from "@/app/components/Application/Loader";
import SelectField from "@/app/components/Application/SelectField";

const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;




const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phone_number: "",
    gender: "",
    stateOfOrigin: "",
    corp_id: "",
    course_selected: "",
    batchResumption: "",
  });


  const nigerianStates = [
    { id: 1, tag: "Abia" },
    { id: 2, tag: "Adamawa" },
    { id: 3, tag: "Akwa Ibom" },
    { id: 4, tag: "Anambra" },
    { id: 5, tag: "Bauchi" },
    { id: 6, tag: "Bayelsa" },
    { id: 7, tag: "Benue" },
    { id: 8, tag: "Borno" },
    { id: 9, tag: "Cross River" },
    { id: 10, tag: "Delta" },
    { id: 11, tag: "Ebonyi" },
    { id: 12, tag: "Edo" },
    { id: 13, tag: "Ekiti" },
    { id: 14, tag: "Enugu" },
    { id: 15, tag: "Gombe" },
    { id: 16, tag: "Imo" },
    { id: 17, tag: "Jigawa" },
    { id: 18, tag: "Kaduna" },
    { id: 19, tag: "Kano" },
    { id: 20, tag: "Katsina" },
    { id: 21, tag: "Kebbi" },
    { id: 22, tag: "Kogi" },
    { id: 23, tag: "Kwara" },
    { id: 24, tag: "Lagos" },
    { id: 25, tag: "Nasarawa" },
    { id: 26, tag: "Niger" },
    { id: 27, tag: "Ogun" },
    { id: 28, tag: "Ondo" },
    { id: 29, tag: "Osun" },
    { id: 30, tag: "Oyo" },
    { id: 31, tag: "Plateau" },
    { id: 32, tag: "Rivers" },
    { id: 33, tag: "Sokoto" },
    { id: 34, tag: "Taraba" },
    { id: 35, tag: "Yobe" },
    { id: 36, tag: "Zamfara" },
    { id: 37, tag: "Federal Capital Territory" },
  ];

  const gender = [
    { id: 1, tag: "Male" },
    { id: 2, tag: "Female" },
    { id: 3, tag: "Prefer Not To Mention" },
  ];

  const courses = [
    { id: 1, tag: "Web Start Essentials" },
    { id: 2, tag: "CodeMaster Intermediate" },
    { id: 3, tag: "Product Management" },
  ];

  const resumptionBatches = [
    { id: 1, tag: "November 2024 Entry" },
    { id: 2, tag: "July 2025 Entry " },
    { id: 3, tag: "March 2025 Entry" },
  ];



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

  const uploadImageToCloudinary = async (image) => {
    if (image && ["image/jpeg", "image/jpg", "image/png"].includes(image.type)) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("cloud_name", cloud_name);
      formData.append("upload_preset", upload_preset);
  
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await response.json();
        if (imgData.url) {
          return imgData.url;  // Return the uploaded image URL
        } else {
          throw new Error("Image upload failed. No URL returned.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setFormValidMessage("Error uploading image. Please try again.");
      }
    } else {
      setFormValidMessage("Invalid image format. Only JPEG, JPG, and PNG are allowed.");
    }
    return null;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);  // Display selected file name
      const url = await uploadImageToCloudinary(file);  // Upload to Cloudinary
      if (url) {
        setFormData({ ...formData, corp_id: url });  // Update form data with image URL
        setImageUrl(url);  // Save the uploaded image URL for preview or further use
      } else {
        setSelectedFile(null);
        setImageUrl("");
      }
    } else {
      setSelectedFile(null);
      setImageUrl("");
    }
  };
  

 

  const handleSubmit = (event) => {
    event.preventDefault();

    const {  
      fullName,
      emailAddress,
      phone_number,
      gender,
      stateOfOrigin,
      corp_id,
      course_selected,
      batchResumption,
    } = formData;
  
    console.log({
      fullName,
      emailAddress,
      phone_number,
      gender,
      stateOfOrigin,
      corp_id,
      course_selected,
      batchResumption,
    });
  
    if (!fullName || !emailAddress || !gender || !phone_number || !stateOfOrigin || !corp_id || !course_selected || !batchResumption) {
      setFormValidMessage("Oops! All fields are required.");
      return;
    }

    // Add additional client-side validation here if necessary
    console.log(formData)
    setIsSubmitting(true);

    axios
      .post(
        `https://dlt-backend.vercel.app/api/v1/cohorts/corperreg`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        localStorage.setItem("isLoggedIn", "true");
        setFormCompleted(true);
        router.push("/congratsCorp");
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

  console.log(formData.corp_id)



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] bg-[#FFEFD4] px-[39px] rounded-[20px] py-[80px] md:px-[56px] md:mb-[218px] md:py-[91px] xl:px-[86px] max-w-[889px] text-[#1c1c1c]">
      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="fullName" className="font-poppins text-[14px] font-normal">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Alexander Wong"
            id="fullName"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="email" className="font-poppins text-[14px] font-normal">
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            placeholder="Wong@example.com"
            id="email"
            value={formData.emailAddress}
            onChange={handleChange}
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phoneNumber" className="font-poppins text-[14px] font-normal">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="08122222221"
            pattern="[0-9]{10,11}"
            id="phoneNumber"
            className="bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="gender" className="font-poppins text-[14px] font-normal">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Select a gender</option>
            {gender.map((gender) => (
              <option key={gender.id} value={gender.tag}>{gender.tag}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="stateOfOrigin" className="font-poppins text-[14px] font-normal">
            State of origin
          </label>
          <select
            type="text"
            name="stateOfOrigin"
            value={formData.stateOfOrigin}
            onChange={handleChange}
            placeholder="Lagos"
            id="stateOfOrigin"
             className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Select a state</option>
             {nigerianStates.map((state) => (
              <option key={state.id} value={state.tag}>{state.tag}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-[8px] text-[#1C1C1C] border-b-[1px] border-b-[#1C1C1C] w-full">
          <label htmlFor="corpId" className="font-poppins text-[14px] font-normal">
            Corp member ID
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="corpId"
              id="corpId"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="corpId"
              className=" bg-[#FC7C13] py-1 px-4 text-[14px] rounded cursor-pointer"
            >
              Upload ID
            </label>
            <span className="text-[10px] font-body font-normal ">
              {selectedFile ? selectedFile : "No file selected"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="coursesForCopers" className="font-poppins text-[14px] font-normal">
          Courses for copers
          </label>
          <select
            name="course_selected"
            id="coursesForCopers"
            value={formData.course_selected}
            onChange={handleChange}
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Select a course</option>
             {courses.map((course) => (
              <option key={course.id} value={course.tag}>{course.tag}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="resumptionBatch" className="font-poppins text-[14px] font-normal">
            Resumption batch
          </label>
          <select
            name="batchResumption"
            id="resumptionBatch"
            value={formData.batchResumption}
            onChange={handleChange}
            className=" outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent"
          >
            <option>Select a batch</option>
             {resumptionBatches.map((batch) => (
              <option key={batch.id} value={batch.tag}>{batch.tag}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="flex items-center justify-center">
        <button type="submit" className="py-[18px] px-[65px] text-center bg-[#FC7C13] rounded-xl text-[16px] font-poppins font-medium text-[#F7FCFE]">{isSubmitting ? "Submitting..." : "Register"}</button>
      </div>

      {formValidMessage && (
          <div className="event-page-registration-error-message text-red-600 mt-4">
            {formValidMessage}
          </div>
        )}

      
    </form>
  );
};

export default Form;
