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
				<FontAwesomeIcon icon={["fab", "lastfm"]} />
				&nbsp;
			</a>
		);
	};

	const InstagramUser: React.FC<LastFMUserProps> = ({ user }) => {
		return (
			<a
				href={`https://www.instagram.com/${user}`}
				target="_blank"
				rel="noreferrer"
			>
				<FontAwesomeIcon icon={["fab", "instagram"]} />
				&nbsp;
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
								<h6>Creators</h6>
								<ul className="icon-section">
									<li>
										David &nbsp;
										<LastFMUser user={"Pantera97"} />
										<InstagramUser user={"salzmanndavid"} />
									</li>
									<li>
										Valentin &nbsp;
										<LastFMUser user={"mrvalstar"} />
										<InstagramUser user={"valischabi"} />
									</li>
								</ul>
							</div>
						</div>
						<div className="column" id="daval">
							<h6>
								<a href="https://daval.dev">© 2020 Copyright DAVAL</a>
							</h6>
						</div>
					</div>
				)}
			</footer>
		</CSSTransition>
	);
};

export default Footer;
