import React, { useState } from "react";

function SelectField({ label, name, options, handleChange, setTuitionFee }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleOptionChange = (e) => {
    handleChange(e)
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "") {
      setValidationError("Please select an option.");
    } else {
      setValidationError("");
    }

    if (label === "Course Selected") {
      switch (value) {
        case "Frontend Development":
          setTuitionFee(370000);
          break;
        case "Full-Stack Development":
          setTuitionFee(570000);
          break;
        case "Product UI/UX Design":
          setTuitionFee(150000);
          break;
        case "Blockchain Development":
          setTuitionFee(0);
          break;
        default:
          setTuitionFee(0);
      }
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
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
    </div>
  );
}

export default SelectField;
