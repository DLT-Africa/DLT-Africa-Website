"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "./FormField";
import SelectField from "./SelectField";
import FileUploadField from "./FileUploadField";
import { useFormValidation } from "./useFormValidation";
import { useImageUpload } from "./useImageUpload";
import { useFormSubmission } from "./useFormSubmission";
import {
  NIGERIAN_STATES,
  GENDER_OPTIONS,
  COURSE_OPTIONS,
  RESUMPTION_BATCH_OPTIONS,
  FIELD_CONFIG,
  UI_CONFIG,
  ERROR_MESSAGES,
} from "./constants";

interface FormData {
  fullName: string;
  emailAddress: string;
  phone_number: string;
  gender: string;
  stateOfOrigin: string;
  corp_id: string;
  course_selected: string;
  batchResumption: string;
}

const Form: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    emailAddress: "",
    phone_number: "",
    gender: "",
    stateOfOrigin: "",
    corp_id: "",
    course_selected: "",
    batchResumption: "",
  });

  // Custom hooks
  const { validateForm, getFieldError, clearErrors } = useFormValidation();
  const { uploadState, uploadImageToCloudinary, resetUploadState } =
    useImageUpload();
  const { submissionState, submitForm, clearError } = useFormSubmission();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      router.push("/congratsCorp");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    clearErrors();
    clearError();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      resetUploadState();
      return;
    }

    setSelectedFile(file.name);
    const url = await uploadImageToCloudinary(file);

    if (url) {
      setFormData({ ...formData, corp_id: url });
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    // Submit form
    await submitForm(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={UI_CONFIG.FORM_STYLES.CONTAINER}
      noValidate
      aria-label="Corper Registration Form"
    >
      <div className="flex flex-col gap-[24px] md:flex-row">
        <FormField
          label={FIELD_CONFIG.LABELS.FULL_NAME}
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={FIELD_CONFIG.PLACEHOLDERS.FULL_NAME}
          required
          error={getFieldError("fullName")}
        />
        <FormField
          label={FIELD_CONFIG.LABELS.EMAIL}
          name="emailAddress"
          type="email"
          value={formData.emailAddress}
          onChange={handleChange}
          placeholder={FIELD_CONFIG.PLACEHOLDERS.EMAIL}
          required
          error={getFieldError("emailAddress")}
        />
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <FormField
          label={FIELD_CONFIG.LABELS.PHONE}
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder={FIELD_CONFIG.PLACEHOLDERS.PHONE}
          pattern={FIELD_CONFIG.PHONE_PATTERN}
          required
          error={getFieldError("phone_number")}
        />
        <SelectField
          label={FIELD_CONFIG.LABELS.GENDER}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[...GENDER_OPTIONS]}
          placeholder="Select a gender"
          required
          error={getFieldError("gender")}
        />
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <SelectField
          label={FIELD_CONFIG.LABELS.STATE}
          name="stateOfOrigin"
          value={formData.stateOfOrigin}
          onChange={handleChange}
          options={[...NIGERIAN_STATES]}
          placeholder="Select a state"
          required
          error={getFieldError("stateOfOrigin")}
        />
        <FileUploadField
          label={FIELD_CONFIG.LABELS.CORP_ID}
          name="corpId"
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
          isUploading={uploadState.isUploading}
          progress={uploadState.progress}
          error={getFieldError("corp_id") || uploadState.error || undefined}
          required
        />
      </div>

      <div className="flex flex-col gap-[24px] md:flex-row">
        <SelectField
          label={FIELD_CONFIG.LABELS.COURSE}
          name="course_selected"
          value={formData.course_selected}
          onChange={handleChange}
          options={[...COURSE_OPTIONS]}
          placeholder="Select a course"
          required
          error={getFieldError("course_selected")}
        />
        <SelectField
          label={FIELD_CONFIG.LABELS.BATCH}
          name="batchResumption"
          value={formData.batchResumption}
          onChange={handleChange}
          options={[...RESUMPTION_BATCH_OPTIONS]}
          placeholder="Select a batch"
          required
          error={getFieldError("batchResumption")}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className={`${UI_CONFIG.FORM_STYLES.BUTTON} ${
            submissionState.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submissionState.isSubmitting || uploadState.isUploading}
          aria-describedby={submissionState.error ? "form-error" : undefined}
        >
          {submissionState.isSubmitting ? "Submitting..." : "Register"}
        </button>
      </div>

      {submissionState.error && (
        <div
          id="form-error"
          className="event-page-registration-error-message text-red-600 mt-4 text-center"
          role="alert"
          aria-live="polite"
        >
          {submissionState.error}
        </div>
      )}
    </form>
  );
};

export default Form;
