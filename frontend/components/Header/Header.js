import Link from "next/link";
import { navbarContent } from "../../configs/navbarConfig";

const Header = () => {
  return (
    <div>
      <Link href={"/"}>
        <img src={navbarContent.logo} />
      </Link>

      <div>
      </div>
    </div>
  );
};

export default Header;
