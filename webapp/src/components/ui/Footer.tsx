import React from "react";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";

import "./Footer.scss";

const Footer: React.FC = () => {

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
		<Container id="desktop-footer">
			<Col id="col1">
			<BuyMeACoffeeButton user="valischabi" />
			</Col>
			<Col id="col2">
			<span className="text-secondary">Our accounts:</span>
			<Nav.Link href="https://www.last.fm/user/Pantera97">Pantera97</Nav.Link>
			<Nav.Link href="https://www.last.fm/user/mrvalstar">mrvalstar</Nav.Link>
			</Col>
			<Col>
			<Nav.Link href="https://www.daval.dev">© 2020 Copyright DAVAL</Nav.Link>
			</Col>
		</Container>
		<Container id="mobile-footer">
			<BuyMeACoffeeButton user="valischabi" />
			<Nav.Link href="https://www.daval.dev">© 2020 Copyright DAVAL</Nav.Link>
		</Container>
	</Navbar>
  );
};

export default Footer;
