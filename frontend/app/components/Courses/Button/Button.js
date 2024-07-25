import React from "react";
import Link from "next/link";

const Button = ({ to, children }) => {
  return (
    <Link
      href={to}
      className="border-[1px] border-[#C54809] rounded text-[#C54809] p-2 px-[20px] text-[16px] hover:bg-orange-50 "
    >
      {" "}
      {children}
    </Link>
  );
};

export default Button;
