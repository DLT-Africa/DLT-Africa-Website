import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import TalentPoolLoader from "@/app/components/Loader/TalentPoolLoader";

// Dynamically import TalentPool with no SSR
const TalentPool = dynamicImport(
  () => import("../components/TalentPool/TalentPool"),
  {
    ssr: false,
    loading: () => <TalentPoolLoader />,
  }
);

const page = () => {
  return (
    <Suspense fallback={<TalentPoolLoader />}>
      <TalentPool />
    </Suspense>
  );
};

export default page;
