import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProgressBar from "./ProgressBar";

import "./Header.scss";
import logo from "../../img/logo/beautifier.svg";

import { useRuntimeStore } from "../../stores";

interface HeaderProps {
	toggleControls: Function;
}

const Header: React.FC<HeaderProps> = ({ toggleControls }) => {
	const showControlToggle = useRuntimeStore((state) => state.initialized);

	return (
		<header>
			<ProgressBar />
			<div className="header-elements">
				<img src={logo} alt="" className="logo" height="50px" />
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
			</div>
		</header>
	);
};

export default Header;
