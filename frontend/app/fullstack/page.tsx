"use client";

import FullStackHero from "@/app/components/Courses/FullStack/FullstackHero";
import FullstackIconSection from "@/app/components/Courses/FullStack/FullstackIconSection";
import FullstackDetail from "@/app/components/Courses/FullStack/FullstackDetail";

const page = () => {
  return (
    <div>
      <FullStackHero />
      <FullstackIconSection />
      <FullstackDetail />
    </div>
  );
};

export default page;
