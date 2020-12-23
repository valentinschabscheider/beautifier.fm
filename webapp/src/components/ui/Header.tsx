import React, { useState } from "react";

import "./Header.scss";
import logo from "../../img/logo/large.png";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavbarBrand } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  startProcess: Function;
}

const Header: React.FC<Props> = ({ startProcess }) => {

  const [text, setText] = useState<string>(
    localStorage.getItem("userName") !== null
      ? String(localStorage.getItem("userName"))
      : ""
  );

  const onSubmit = (e: any) => {
    e.preventDefault();

    localStorage.setItem("userName", text);
    startProcess(text);
  };

  return (
    <Navbar collapseOnSelect className="navbar navbar-dark bg-dark" expand="lg">
    <NavbarBrand><img src={logo} alt="" className="navbar-brand" /></NavbarBrand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Form>
                <InputGroup>
                <Form.Control type="text" id="username" placeholder="last.fm User" autoFocus value={text} onChange={(e) => setText(e.target.value)}/>
                <InputGroup.Append>
                <Button id="go" variant="secondary" onClick={(e) => onSubmit(e)}>
                <FontAwesomeIcon icon={["fas", "search"]} />
                </Button>
                </InputGroup.Append>
                </InputGroup>
      </Form>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
