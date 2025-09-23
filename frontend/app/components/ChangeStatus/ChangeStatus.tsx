import { FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ChangeStatusProps {
  id: string;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({ id }) => {
  const [studentStatus, setStudentStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const changeRole = async (): Promise<void> => {
    if (!studentStatus) {
      toast.error("Please select a status to be updated");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cohorts/upgrade-admission`,
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
