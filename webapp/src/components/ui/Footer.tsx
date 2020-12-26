import React, { useState } from "react";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

import "./Footer.scss";

const Footer: React.FC = () => {
  //add ability to minimize footer or make scrobble table full screen

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

  const [visible, setVisible] = useState<boolean>(true);

  return (
    <footer>
      <button
        id="footer-toggle"
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        {visible ? "▼" : "▲"}
      </button>
      {visible && (
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
  );
};

export default Footer;
