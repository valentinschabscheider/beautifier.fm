import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.scss";
import logo from "../../img/logo/medium.png";

import useStore from "../../store";

interface HeaderProps {
	toggleControls: Function;
}

const Header: React.FC<HeaderProps> = ({ toggleControls }) => {
	const isFetching = useStore((state) => state.isFetching);

	const [showControlsButton, setShowControlsButton] = useState(false);

	if (!showControlsButton && isFetching) setShowControlsButton(true);

	return (
		<header>
			<img src={logo} alt="" className="logo" />
			{showControlsButton && (
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
