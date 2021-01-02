import React, { useState } from "react";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProgressBar from "./components/ui/ProgressBar";
import Controls from "./components/ui/Controls";
import ScrobbleTable from "./components/ui/ScrobbleTable";

import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import fetchScrobbles from "./components/lastfm";
import CookieConsent from "./components/ui/CookieConsent";

import { CSSTransition } from "react-transition-group";

import { duration as animationDuration } from "./models/Animation";

import FullscreenContainer from "./components/ui/FullscreenContainer";

import useStore from "./store";

import { DateRange } from "./components/ui/Controls";

library.add(fas);

const App: React.FC = () => {
	const [showControls, setShowControls] = useState(true);

	const setProgress = useStore((state) => state.setProgress);

	const startedFetching = useStore((state) => state.startedFetching);
	const finishededFetching = useStore((state) => state.finishededFetching);
	const addScrobbles = useStore((state) => state.addScrobbles);
	const deleteScrobbles = useStore((state) => state.deleteScrobbles);

	const goOrsmth: Function = (u: string, d: DateRange) => {
		fetchScrobbles(
			u,
			d,
			setProgress,
			addScrobbles,
			deleteScrobbles,
			finishededFetching
		);
		setShowControls(false);
		startedFetching();
	};

	return (
		<FullscreenContainer className="App">
			<Header
				toggleControls={() => setShowControls((showControls) => !showControls)}
			/>
			<ProgressBar />
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
