"use client";
import { useEffect, useState } from "react";
import TalentPool from "../components/TalentPool/TalentPool";
import TalentPoolLoader from "@/app/components/Loader/TalentPoolLoader";

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => {
      clearTimeout(loadTimeout);
    };
  }, []);

  return <div>{loading ? <TalentPoolLoader /> : <TalentPool />}</div>;
};

export default page;
