"use client";

import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import IndexHome from "@/app/components/HomePage/Home";

export default function Bootcamp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <IndexHome />
        </>
      )}
    </div>
  );
}
