import React from "react";

import logo from "@assets/logo.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="w-full h-20 bg-blue-200">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Header;
