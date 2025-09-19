"use client";
import BlockchainHero from "@/app/components/Courses/BlockChain/BlockchainHero";
import BlockchainIconSection from "@/app/components/Courses/BlockChain/BlockchainIconSection";
import BlockchainDetail from "@/app/components/Courses/BlockChain/BlockchainDetail";

const page = () => {
  return (
    <div>
      <BlockchainHero />
      <BlockchainIconSection />
      <BlockchainDetail />
    </div>
  );
};

export default page;
