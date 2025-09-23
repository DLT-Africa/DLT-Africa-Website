"use client";

import { useEffect, useState } from "react";
import dynamicImport from "next/dynamic";
import Loader from "../components/Loader/Loader";

// Dynamically import IndexHome with no SSR
const IndexHome = dynamicImport(
  () => import("@/app/components/HomePage/Home"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

export default function Bootcamp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <Loader />;
  }

  return (
    <div>
      <IndexHome />
    </div>
  );
}
