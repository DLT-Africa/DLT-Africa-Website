import React from "react";
import { UI_CONFIG } from "./constants";

interface FileUploadFieldProps {
  label: string;
  name: string;
  selectedFile: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
  progress?: number;
  error?: string;
  required?: boolean;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  name,
  selectedFile,
  onFileChange,
  isUploading = false,
  progress = 0,
  error,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-[8px] text-[#1C1C1C] border-b-[1px] border-b-[#1C1C1C] w-full">
      <label htmlFor={name} className="font-poppins text-[14px] font-normal">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex items-center gap-2">
        <input
          type="file"
          name={name}
          id={name}
          className="hidden"
          onChange={onFileChange}
          accept="image/jpeg,image/jpg,image/png"
          disabled={isUploading}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? "true" : "false"}
        />

        <label
          htmlFor={name}
          className={`${UI_CONFIG.FORM_STYLES.UPLOAD_BUTTON} ${
            isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload ID"}
        </label>

        <div className="flex flex-col">
          <span className="text-[10px] font-body font-normal">
            {selectedFile ? selectedFile : "No file selected"}
          </span>

          {isUploading && (
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#FC7C13] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

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

export default FileUploadField;
