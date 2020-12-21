import React from "react";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

import "./Footer.scss";

const Footer: React.FC = () => {
  //add ability to minimize footer or make scrobble table full screen

  return (
    <footer>
		<div className="container">
			<div className="row text-center text-xs-center text-sm-left text-md-center">
				<div className="col-xs-12 col-sm-4 col-md-4">
					<h6>Like our page? support us</h6>
          <BuyMeACoffeeButton user="valischabi" />
				</div>
				<div className="col-xs-12 col-sm-4 col-md-4">
					<h6>Creator's last.fm accounts</h6>
					<ul className="list-unstyled quick-links">
						<li><a href="https://www.last.fm/user/Pantera97"><i className="fa fa-angle-double-right"></i>Pantera97</a></li>
						<li><a href="https://www.last.fm/user/mrvalstar"><i className="fa fa-angle-double-right"></i>mrvalstar</a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-4">
					<h6>© 2020 Copyright DAVAL</h6>
				</div>
			</div>	
		</div>
	</footer>
  );
};

export default Footer;
