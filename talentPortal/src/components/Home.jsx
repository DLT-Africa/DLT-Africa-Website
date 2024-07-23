import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import dlt from "../../public/DLT.png";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" h-full flex justify-center py-6">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Header />
        <RegistrationForm />
      </div>
    </div>
  );
};

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

const RegistrationForm = () => {
  const fields = [
    "Full name",
    "Phone number",
    "Email Address",
    "Upload resume",
  ];

  const oppositeFields = ["Gender", "GitHub link", "Add Image", "Role"];

  const [formData, setFormData] = useState(
    fields.concat(oppositeFields).reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
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
    <form className="md:w-[889px] w-[300px] bg-[#FFEFD4] flex flex-col justify-center py-[69px] px-[30px] md:px-[86px] rounded">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex justify-between mb-4 md:flex-row flex-col w-[full]  "
        >
          <InputField
            label={field}
            value={formData[field]}
            onChange={handleChange}
          />
          <InputField
            label={oppositeFields[index]}
            value={formData[oppositeFields[index]]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className=" mt-[20px] md:mt-[55px] flex flex-col items-center  justify-center ">
        <button
          type="submit"
          className={`p-[10px] w-[196px] text-[#F7FCFE] text-[13px] bg-[#FC7C13] rounded  ${
            !isFormValid ? "button-slide" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Register
        </button>
        {/* {!isFormValid && <p className="text-red-500 mt-2">Fill the fields or sleep here</p>} */}

      </div>
    </form>
  );
};

const InputField = ({ label }) => (
  <div className="flex flex-col gap-4 md:gap-2 md:w-[49%]">
    <label className="text-[14px] font-[400] font-Poppins">{label} :</label>
    {label === "Gender" ? (
      <select className="bg-transparent border-b border-neutral-400 p-2">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    ) : label === "Add Image" ? (
      <input
        type="file"
        className="bg-transparent border-b border-neutral-400 border-b-[1.5px] outline-none focus:border-b focus:border-neutral-900 p-2"
      />
    ) : (
      <input
        type="text"
        className="bg-transparent border-b border-neutral-400 border-b-[1.5px] outline-none focus:border-b focus:border-neutral-900 p-2"
      />
    )}
  </div>
);

export default Home;
