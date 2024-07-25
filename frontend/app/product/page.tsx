import ProductDesignDetail from "@/app/components/Courses/Product/ProductDesignDetail";
import ProductDesignHero from "@/app/components/Courses/Product/ProductDesignHero";
import ProductDesignIconSection from "@/app/components/Courses/Product/ProductDesignIconSection";

const page = () => {
  return (
    <div>
      <ProductDesignHero />
      <ProductDesignIconSection />
      <ProductDesignDetail />
    </div>
  );
};

export default page;
