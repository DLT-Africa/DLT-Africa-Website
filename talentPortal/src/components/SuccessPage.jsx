import React from "react";

const SuccessPage = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Registration Successful</h1>
        <p className="text-gray-700 mb-2">
          Thank you for registering for the DLT Africa talent pool. We have sent
          a confirmation email to your provided email address.
        </p>
        <p className="text-gray-700 mb-8">
          Please check your <b> spam folder</b> if you do not see the
          confirmation email in your inbox.
        </p>
        <p className="text-gray-700 mb-8">
          Visit{" "}
          <a
            href="https://dltafrica.io/talent-pool"
            className="text-orange-500 underline"
          >
            Talent Pool Page
          </a>{" "}
          to view your talent card.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
