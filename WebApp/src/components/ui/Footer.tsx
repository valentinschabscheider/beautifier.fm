import React from "react";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <BuyMeACoffeeButton user="valischabi" />
      </div>
      <div>
        <p> © 2020 Copyright DAVAL</p>
        <p>Creator's last.fm accounts:</p>
        <p>
          <a href="https://www.last.fm/user/Pantera97">Pantera97</a> •
          <a href="https://www.last.fm/user/mrvalstar">mrvalstar</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
