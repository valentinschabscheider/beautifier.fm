import React from "react";

import { default as CookieConsentPaked } from "react-cookie-consent";

const CookieConsent: React.FC = () => {
	//save decition in context or block page
	return (
		<CookieConsentPaked
			debug={process.env.NODE_ENV === "development"} //react context
			buttonText="Sure man!!"
		>
			This website uses cookies to enhance the user experience.
		</CookieConsentPaked>
	);
};

export default CookieConsent;
