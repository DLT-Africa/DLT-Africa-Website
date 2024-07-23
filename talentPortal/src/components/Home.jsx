import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import dlt from "../../public/DLT.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../redux/auth/authService";
import { register, RESET } from "../redux/auth/authSlice";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

// Initial form state
const initialState = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  uploadResume: "",
  gender: "",
  gitHubLink: "",
  addImage: "",
  skills: [],
};

// Main component
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
        const response = await fetch(`${URL}/api/v1/skill/skills`);
        const data = await response.json();
        setAvailableSkills(
          Object.keys(data).filter((key) => key !== "_id" && key !== "__v")
        );
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      }
    };

    fetchSkills();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, addImage: file });
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
      addImage,
    } = formData;

    if (
      !fullName ||
      !phoneNumber ||
      !emailAddress ||
      !uploadResume ||
      !gender ||
      !gitHubLink ||
      !addImage
    ) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(emailAddress)) {
      return toast.error("Please enter a valid email");
    }

    try {
      const imageUrl = await uploadImageToCloudinary(addImage);
      const userData = { ...formData, addImage: imageUrl || "" };
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

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedSkills = checked
        ? [...prevData.skills, value]
        : prevData.skills.filter((skill) => skill !== value);

      return { ...prevData, skills: updatedSkills };
    });
  };

  return (
    <div className="h-full flex justify-center py-6">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Header />
        <RegistrationForm
          formData={formData}
          setFormData={setFormData}
          createAccount={createAccount}
          handleFileChange={handleFileChange}
          handleSkillChange={handleSkillChange}
          availableSkills={availableSkills}
        />
      </div>
    </div>
  );
};

// Header component
const Header = () => (
  <header className="flex flex-col items-center justify-center w-screen gap-[5px] md:gap-[15px] md:w-[796px] p-4 mb-[20px]">
    <img
      src={dlt}
      alt="dlt-logo"
      loading="lazy"
      className="w-[50px] md:w-[50px]"
    />
    <p className="text-[#1c1c1c] text-[20px] md:text-[30px] font-[400]">
      DLT Africa talent pool
    </p>
    <p className="text-[#1c1c1c] font-Poppins text-[13px] md:text-[15px] font-[400]">
      Register for the DLT Africa talent pool.
    </p>
  </header>
);

// RegistrationForm component
const RegistrationForm = ({
  formData,
  setFormData,
  createAccount,
  handleFileChange,
  handleSkillChange,
  availableSkills,
}) => {
  const fields = ["fullName", "phoneNumber", "emailAddress", "uploadResume"];
  const oppositeFields = ["gender", "gitHubLink", "addImage", "skill set"];

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== "" || Array.isArray(value)
    );
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="md:w-[889px] w-[300px] bg-[#FFEFD4] flex flex-col justify-center py-[69px] px-[30px] md:px-[86px] rounded"
      onSubmit={createAccount}
    >
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex justify-between mb-4 md:flex-row flex-col w-full"
        >
          <InputField
            label={field}
            value={formData[field]}
            onChange={handleChange}
            handleFileChange={handleFileChange}
          />
          <InputField
            label={oppositeFields[index]}
            value={formData[oppositeFields[index]]}
            onChange={handleChange}
            handleFileChange={handleFileChange}
            handleSkillChange={handleSkillChange}
            availableSkills={availableSkills}
          />
        </div>
      ))}

      <div className="mt-[20px] md:mt-[55px] flex flex-col items-center justify-center">
        <button
          type="submit"
          className={`p-[10px] w-[196px] text-[#F7FCFE] text-[13px] bg-[#FC7C13] rounded ${
            !isFormValid ? "button-slide" : ""
          }`}
          onMouseOver={!isFormValid ? (e) => e.preventDefault() : null}
        >
          {isFormValid ? "Register" : "Please fill all the fields"}
        </button>
      </div>
    </form>
  );
};

// InputField component
const InputField = ({
  label,
  value,
  onChange,
  handleFileChange,
  handleSkillChange,
  availableSkills,
}) => {
  if (label === "skill set") {
    return (
      <div className="flex flex-col gap-2">
        {availableSkills.map((skill) => (
          <label key={skill} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={skill}
              checked={value.includes(skill)} // Ensure 'value' is an array
              onChange={handleSkillChange}
            />
            {skill.charAt(0).toUpperCase() + skill.slice(1)}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-2 md:w-[49%]">
      <label className="text-[14px] font-[400] font-Poppins capitalize">
        {label} :
      </label>
      {label === "gender" ? (
        <select
          name={label}
          value={value}
          onChange={onChange}
          className="bg-transparent border-b border-neutral-400 p-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ) : label === "addImage" ? (
        <input
          type="file"
          name={label}
          onChange={handleFileChange}
          className="bg-transparent border-b border-neutral-400 border-b-[1.5px] outline-none focus:border-b focus:border-neutral-900 p-2"
        />
      ) : (
        <input
          type="text"
          name={label}
          value={value}
          onChange={onChange}
          className="bg-transparent border-b border-neutral-400 border-b-[1.5px] outline-none focus:border-b focus:border-neutral-900 p-2"
        />
      )}
    </div>
  );
};

export default Home;
