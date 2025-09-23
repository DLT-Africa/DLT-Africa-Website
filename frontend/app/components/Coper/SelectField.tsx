import React from "react";
import FormField from "./FormField";

interface Option {
  id: number;
  tag: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error,
  className = "",
}) => {
  const baseSelectClass =
    "outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent";
  const errorClass = error ? "border-red-500" : "";
  const selectClass = `${baseSelectClass} ${errorClass} ${className}`;

  return (
    <FormField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      className="w-full"
    >
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
        required={required}
        className={selectClass}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.tag}>
            {option.tag}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default SelectField;
