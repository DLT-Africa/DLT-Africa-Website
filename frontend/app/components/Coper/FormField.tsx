import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children?: React.ReactNode;
  "aria-describedby"?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  pattern,
  required = false,
  error,
  className = "",
  children,
  "aria-describedby": ariaDescribedBy,
}) => {
  const baseInputClass =
    "bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]";
  const errorClass = error ? "border-red-500" : "";
  const inputClass = `${baseInputClass} ${errorClass} ${className}`;

  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={name} className="font-poppins text-[14px] font-normal">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children ? (
        children
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          className={inputClass}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error ? "true" : "false"}
        />
      )}

      {error && (
        <span
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
