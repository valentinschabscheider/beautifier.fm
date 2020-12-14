import React from "react";

import "./Header.css";
import logo from "../../img/logo/medium.png";

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="" className="logo" />
    </header>
  );
};

export default Header;
