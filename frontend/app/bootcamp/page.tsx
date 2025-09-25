"use client";

import { useEffect, useState } from "react";
import dynamicImport from "next/dynamic";

// Dynamic imports prevent server from evaluating browser-only libs
const Loader = dynamicImport(() => import("../components/Loader/Loader"), {
  ssr: false,
});
const IndexHome = dynamicImport(
  () => import("@/app/components/HomePage/Home"),
  {
    ssr: false,
    loading: () => (
      <div className="relative">
        {/* Hero Section Skeleton */}
        <section className="flex flex-col-reverse md:flex-row bg-[#F6F7F6] lg:gap-[30px] md:gap-[22.76px] p-[30px] 2xl:px-[60px] items-center justify-between min-h-[657px] relative">
          <div className="lg:w-[500px] mt-[30px] md:mt-0 md:w-[369px] xl:w-[800px] 2xl:w-[800px] flex flex-col md:justify-center">
            {/* Title skeleton */}
            <div className="h-16 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-16 bg-gray-300 rounded animate-pulse mb-4"></div>
            {/* Description skeleton */}
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-4 w-3/4"></div>
            {/* Button skeleton */}
            <div className="h-[55px] bg-gray-300 rounded-[10px] animate-pulse"></div>
          </div>
          <div className="flex">
            <div className="w-[400px] h-[400px] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* What You Section Skeleton */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-8 mx-auto w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Register Section Skeleton */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-4 mx-auto w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-8 mx-auto w-1/2"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse mx-auto w-48"></div>
          </div>
        </div>

        {/* Partners Section Skeleton */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-8 mx-auto w-1/4"></div>
            <div className="flex justify-center space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-16 bg-gray-300 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section Skeleton */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-8 mx-auto w-1/4"></div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export const dynamic = "force-dynamic";

export default function Bootcamp() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return <Loader />;

  // Show only the loader during loading state to prevent footer from showing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return <IndexHome />;
}
