"use client";

import { Button } from "@material-tailwind/react";
import FormHeader from "./FormHeader";
import FormFields from "./FormFields";
import FormCheckboxes from "./FormCheckboxes";
import { useApplicationForm } from "./hooks/useApplicationForm";

const Application: React.FC = () => {
  const {
    formData,
    checkboxesChecked,
    formValidMessage,
    isSubmitting,
    tuitionFee,
    isApplicationClosed,
    allCheckboxesChecked,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    setTuitionFee,
  } = useApplicationForm();

  return (
    <div
      className="bg-auto bg-no-repeat bg-left-top"
      style={{ backgroundImage: `url(/images/application-page-bg.svg)` }}
    >
      <div
        className="bg-auto bg-no-repeat bg-[right_bottom_16rem]"
        style={{
          backgroundImage: `url(/images/application-page-right-bg.svg)`,
        }}
      >
        <div className="flex flex-col pt-[103px] px-4 lg:px-12">
          <FormHeader />

          <div className="mt-5 mb-20 p-2">
            <form
              className="w-full lg:min-w-[75%] 2xl:min-w-[70%] lg:max-w-[75%] 2xl:max-w-[70%] rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto"
              onSubmit={handleSubmit}
            >
              <FormFields
                formData={formData}
                onInputChange={handleInputChange}
                onTuitionFeeChange={setTuitionFee}
                tuitionFee={tuitionFee}
              />

              <FormCheckboxes
                checkboxesChecked={checkboxesChecked}
                onCheckboxChange={handleCheckboxChange}
                tuitionFee={tuitionFee}
              />

              <Button
                type="submit"
                size="lg"
                className={`capitalize px-16 py-4 mt-5 bg-[#FC7C13] ${
                  !allCheckboxesChecked && "pointer-events-none opacity-50"
                }`}
                disabled={
                  !allCheckboxesChecked || isSubmitting || isApplicationClosed
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>

              {formValidMessage && (
                <div className="event-page-registration-error-message">
                  {formValidMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
