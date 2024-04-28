import React, { useState } from "react";

function SelectField({ label, name, options, handleChange, setTuitionFee, classType }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleOptionChange = (e) => {
    handleChange(e);
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "") {
      setValidationError("Please select an option.");
    } else {
      setValidationError("");
    }

    if (label === "Course Selected") {
      let tuitionFee = 0;
      if (classType === "Physical") {
        switch (value) {
          case "Frontend Development":
            tuitionFee = 410000;
            break;
          case "Full-Stack Development":
            tuitionFee = 630000;
            break;
          case "Product UI/UX Design":
            tuitionFee = 170000;
            break;
          case "Blockchain Development":
            tuitionFee = 0;
            break;
          default:
            tuitionFee = 0;
        }
      } else if (classType === "Online") {
        switch (value) {
          case "Frontend Development":
            tuitionFee = 320000;
            break;
          
          case "Blockchain Development":
            tuitionFee = 0;
            break;
          default:
            tuitionFee = 0;
        }
      }
      setTuitionFee(tuitionFee);
    }
  };

  return (
    <div>
      <label className="block text-sm font-normal font-bold mb-2 mt-[-8px] ">
        {label}:
      </label>
      <select
        value={selectedOption}
        name={name}
        onChange={(e) => handleOptionChange(e)}
        className="block w-full border-0 border-b-[1px] border-[#123c2f80] py-2 px-3 focus:outline-none bg-[#FFEFD4]"
      >
        <option value="">&nbsp;</option>
        {options.map(({ id, tag }) => (
          <option key={id} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      {/* {validationError && <p style={{ color: "red" }}>{validationError}</p>} */}
    </div>
  );
}

export default SelectField;
