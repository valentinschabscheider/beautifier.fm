import React, { useState } from "react";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Controls from "./components/ui/Controls";
import ScrobbleTable from "./components/ui/ScrobbleTable";

import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import fetchScrobbles from "./components/lastfm";
import CookieConsent from "./components/ui/CookieConsent";

import { CSSTransition } from "react-transition-group";

import { duration as animationDuration } from "./models/Animation";

import FullscreenContainer from "./components/ui/FullscreenContainer";

import { useScrobbleStore } from "./stores";

import { DateRange } from "./components/ui/Controls";
import shallow from "zustand/shallow";

library.add(fas);
library.add(fab);

const App: React.FC = () => {
	const [showControls, setShowControls] = useState(true);

	const [setProgress, addScrobbles, deleteScrobbles] = useScrobbleStore(
		(state) => [state.setProgress, state.addScrobbles, state.deleteScrobbles],
		shallow
	);

	const goOrsmth: Function = (u: string, d: DateRange) => {
		fetchScrobbles(u, d, setProgress, addScrobbles, deleteScrobbles);
		setShowControls(false);
	};

	return (
		<FullscreenContainer className="App">
			<Header
				toggleControls={() => setShowControls((showControls) => !showControls)}
			/>
			<main>
				<CSSTransition
					in={showControls}
					unmountOnExit
					timeout={animationDuration}
					classNames="control-container"
				>
					<div className="control-container">
						<Controls startProcess={goOrsmth} />
					</div>
				</CSSTransition>

				<div className="table-container">
					<ScrobbleTable />
				</div>
			</main>
			<Footer />
			<CookieConsent />
		</FullscreenContainer>
	);
};

export default App;
