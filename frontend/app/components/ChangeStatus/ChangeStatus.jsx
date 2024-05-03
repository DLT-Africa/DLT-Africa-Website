import { FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChangeStatus = ({ id }) => {
  console.log(id);
  const [studentStatus, setStudentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeRole = async () => {
    const router = useRouter();
    if (!studentStatus) {
      toast.error("Please select a status to be updated");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://dlt-backend.vercel.app/api/v1/cohorts/upgrade-admission`,
        { status: studentStatus, id }
      );
      router.push("/admin-dashboard");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <select
        value={studentStatus}
        onChange={(e) => setStudentStatus(e.target.value)}
      >
        <option value="Not Paid">-- select status --</option>
        <option value="paid">Paid</option>
        <option value="accepted">Accepted</option>
      </select>
      <button
        className="--btn --btn-primary"
        onClick={changeRole}
        disabled={isLoading}
      >
        <FaCheck size={25} color="green" />
      </button>
    </div>
  );
};

export default ChangeStatus;
