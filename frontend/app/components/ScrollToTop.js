import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ScrollToTop = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default ScrollToTop;
