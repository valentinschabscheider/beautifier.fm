import React from "react";

import "./Header.scss";
import logo from "../../img/logo/medium.png";

interface HeaderProps {
	children: any;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
	return (
		<header>
			<img src={logo} alt="" className="logo" />
			{children}
		</header>
	);
};

export default Header;
