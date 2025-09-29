import { FaCheck } from "react-icons/fa6";

const FormHeader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-content-between">
      <div className="p-4">
        <h2 className="text-4xl font-bold mb-4">
          Apply to Join Our Bootcamp Class
        </h2>
        <p className="mb-4 text-lg">
          Once you've applied, our admissions team will contact you by email to
          schedule a short interview in order to discuss your application.
        </p>
      </div>
      <div className="p-4 flex justify-end">
        <div className="border rounded-2xl border-gray-600 bg-[#FFF] p-6 max-w-[404px]">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div className="mt-1 h-4 w-4">
                <FaCheck color="#FEA650" />
              </div>
              <p>Less than 5 minutes</p>
            </div>
            <div className="flex gap-2">
              <div className="mt-1 h-4 w-4">
                <FaCheck color="#FEA650" />
              </div>
              <p>No prepayment and no commitment</p>
            </div>
            <div className="flex gap-2">
              <div className="mt-1 w-4">
                <FaCheck color="#FEA650" />
              </div>
              <p>350+ alumni have joined our community, so can you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
