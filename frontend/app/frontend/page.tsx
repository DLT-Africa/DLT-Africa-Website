import FrontendHero from "@/app/components/Courses/Frontend/FrontendHero";
import FrontendDetail from "@/app/components/Courses/Frontend/FrontendDetail";
import FrontendIconSection from "@/app/components/Courses/Frontend/FrontendIconSection";

const page = () => {
  return (
    <div>
      <FrontendHero />
      <FrontendIconSection />
      <FrontendDetail />
    </div>
  );
};

export default page;
