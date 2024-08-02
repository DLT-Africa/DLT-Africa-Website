import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import dlt from "/DLT.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../redux/auth/authService";
import { register, RESET } from "../redux/auth/authSlice";
import axios from "axios";

const URL = import.meta.env.VITE_APP_BACKEND_URL;
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const initialState = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  uploadResume: "",
  gender: "",
  gitHubLink: "",
  description: "",
  profileImage: "",
  bgImage: "",
  role: "",
  skills: [],
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [availableSkills, setAvailableSkills] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `https://talent-pool-server.vercel.app/api/v1/skill/skills`
        );
        const skillCategories = Object.keys(response.data).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setAvailableSkills(skillCategories);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      }
    };

    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const {
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      profileImage,
      bgImage,
      description,
      role,
    } = formData;

    if (
      !fullName ||
      !phoneNumber ||
      !emailAddress ||
      !uploadResume ||
      !gender ||
      !gitHubLink ||
      !profileImage ||
      !bgImage ||
      !description ||
      !role
    ) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(emailAddress)) {
      return toast.error("Please enter a valid email");
    }

    try {
      const profileImageUrl = await uploadImageToCloudinary(profileImage);
      const bgImageUrl = await uploadImageToCloudinary(bgImage);
      const userData = {
        ...formData,
        profileImage: profileImageUrl || "",
        bgImage: bgImageUrl || "",
      };
      await dispatch(register(userData));
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error during registration");
    }
  };

  const uploadImageToCloudinary = async (image) => {
    if (
      image &&
      ["image/jpeg", "image/jpg", "image/png"].includes(image.type)
    ) {
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
        return imgData.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    } else {
      toast.error("Invalid image format. Only JPEG, JPG, and PNG are allowed.");
    }
    return null;
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
    }
    dispatch(RESET());
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="h-full flex justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 justify-center items-center max-w-4xl w-full">
        <header className="flex flex-col items-center justify-center w-full gap-2 md:gap-4 p-4 mb-2 md:mb-8">
          <img
            src={dlt}
            alt="dlt-logo"
            loading="lazy"
            className="w-12 md:w-16"
          />
          <p className="text-gray-800 text-xl md:text-3xl font-medium text-center">
            DLT Africa talent pool
          </p>
          <p className="text-gray-800 text-sm md:text-base font-normal text-center">
            Register for the DLT Africa talent pool.
          </p>
        </header>

        <form
          className="border bg-[#FFEFD4] px-4 py-6 md:px-8 md:py-8 w-full max-w-3xl rounded flex flex-col gap-4"
          onSubmit={createAccount}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="fullName" className="text-[14px] font-Poppins">
                Full name:
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="Alexander Wong"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="gender" className="text-[14px] font-Poppins">
                Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="phoneNumber" className="text-[14px] font-Poppins">
                Phone Number:
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="+234705746234"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="gitHubLink" className="text-[14px] font-Poppins">
                GitHub Link:
              </label>
              <input
                type="text"
                name="gitHubLink"
                value={formData.gitHubLink}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label
                htmlFor="emailAddress"
                className="text-[14px] font-Poppins"
              >
                Email Address:
              </label>
              <input
                type="text"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="Alexanderwong@gmail.com"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="profileImage" className="text-[14px] font-Poppins">
                Upload Profile Image:
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label
                htmlFor="uploadResume"
                className="text-[14px] font-Poppins"
              >
                Resume Link:
              </label>
              <input
                type="text"
                name="uploadResume"
                value={formData.uploadResume}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="https://"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="bgImage" className="text-[14px] font-Poppins">
                Upload Background Image:
              </label>
              <input
                type="file"
                name="bgImage"
                onChange={handleFileChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="description" className="text-[14px] font-Poppins">
                Short Description:
              </label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="I am a ....(200 characters )"
               
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label htmlFor="role" className="text-[14px] font-Poppins">
                Major:
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="bg-transparent outline-none border-b border-gray-300 focus:border-gray-900 w-full"
                placeholder="frontend developer || backend developer"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="skills" className="text-[14px] font-Poppins">
                Skill Set:
              </label>
              <code className="text-[8px]">Pick all that apply to you</code>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <div key={skill} className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => {
                          const selectedSkills = [...formData.skills];
                          if (e.target.checked) {
                            selectedSkills.push(skill);
                          } else {
                            const index = selectedSkills.indexOf(skill);
                            if (index > -1) selectedSkills.splice(index, 1);
                          }
                          setFormData({ ...formData, skills: selectedSkills });
                        }}
                      />
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-4 bg-[#FC7C13] w-[196px] text-white py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
