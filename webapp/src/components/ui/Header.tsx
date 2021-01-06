import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.scss";
import logo from "../../img/logo/medium.png";

import { useRuntimeStore } from "../../stores";

interface HeaderProps {
	toggleControls: Function;
}

const Header: React.FC<HeaderProps> = ({ toggleControls }) => {
	const showControlToggle = useRuntimeStore((state) => state.initialized);

	return (
		<header>
			<img src={logo} alt="" className="logo" />
			{showControlToggle && (
				<Button
					id="showControl"
					variant="dark"
					onClick={(e) => {
						e.preventDefault();
						toggleControls();
					}}
				>
					<FontAwesomeIcon icon={["fas", "bars"]} />
				</Button>
			)}
		</header>
	);
};

export default Header;
