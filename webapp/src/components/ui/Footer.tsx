import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

import { duration as animationDuration } from "../../models/Animation";

import "./Footer.scss";

interface FooterProps {
	startVisible?: boolean;
}

const Footer: React.FC<FooterProps> = ({ startVisible = true }) => {
	//add ability to minimize footer or make scrobble table full screen

	const [visible, setVisible] = useState<boolean>(startVisible);
	const [collapsing, setCollapsing] = useState<boolean>(false);

	interface LastFMUserProps {
		user: string;
	}

	const LastFMUser: React.FC<LastFMUserProps> = ({ user }) => {
		return (
			<a
				href={`https://www.last.fm/user/${user}`}
				target="_blank"
				rel="noreferrer"
			>
				{user}
			</a>
		);
	};

	return (
		<CSSTransition
			in={visible}
			timeout={animationDuration}
			classNames="footer-collapse"
			onEnter={() => {
				setCollapsing(true);
			}}
			onEntered={() => {
				setCollapsing(false);
			}}
			onExit={() => {
				setCollapsing(true);
			}}
			onExited={() => {
				setCollapsing(false);
			}}
		>
			<footer>
				<button
					id="footer-toggle"
					onClick={(e) => {
						e.preventDefault();
						setVisible(!visible);
					}}
				>
					<FontAwesomeIcon
						icon={["fas", visible ? "chevron-down" : "chevron-up"]}
					/>
				</button>
				{(visible || collapsing) && (
					<div className="elements-container">
						<div className="column">
							<h6>Like our page? support us</h6>
							<BuyMeACoffeeButton user="valischabi" />
						</div>
						<div className="column">
							<div>
								<h6>Creator's last.fm accounts</h6>
								<ul>
									<li>
										<LastFMUser user={"Pantera97"} />
									</li>
									<li>
										<LastFMUser user={"mrvalstar"} />
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<h6>
								© 2020 Copyright <a href="https://daval.dev">DAVAL</a>
							</h6>
						</div>
					</div>
				)}
			</footer>
		</CSSTransition>
	);
};

export default Footer;
