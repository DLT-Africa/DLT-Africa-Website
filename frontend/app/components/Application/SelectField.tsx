import React, { useState } from "react";

interface Option {
  id: number;
  tag: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setTuitionFee?: (fee: number) => void;
  classType?: string;
  className?: string;
  value?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  handleChange,
  setTuitionFee,
  classType,
  className,
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    handleChange(e);
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "") {
      setValidationError("Please select an option.");
      return;
    }

    setValidationError("");

    if (label === "Course Selected" && setTuitionFee) {
      let tuitionFee = 0;
      if (classType === "Physical") {
        switch (value) {
          case "Frontend Development":
            tuitionFee = 420000;
            break;
          case "Full-Stack Development":
            tuitionFee = 630000;
            break;
          case "Product UI/UX Design":
            tuitionFee = 170000;
            break;
          case "Graphics Design":
            tuitionFee = 150000;
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
          case "Product UI/UX Design":
            tuitionFee = 170000;
            break;
          case "Graphics Design":
            tuitionFee = 150000;
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
      <label className="block text-sm font-bold mb-2 mt-[-8px] ">
        {label}:
      </label>
      <select
        value={selectedOption}
        name={name}
        onChange={(e) => handleOptionChange(e)}
        className={`block w-full border-0 border-b-[1px] border-[#123c2f80] py-2 px-3 focus:outline-none bg-[#FFEFD4] ${
          className || ""
        }`}
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
};

export default SelectField;
