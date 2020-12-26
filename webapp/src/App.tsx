import React, { useState } from "react";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProgressBar from "./components/ui/ProgressBar";
import Controls from "./components/ui/Controls";
import ScrobbleTable from "./components/ScrobbleTable/ScrobbleTable";

import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import fetchScrobbles from "./components/lastfm";
import { Scrobble } from "./components/lastfm";
import CookieConsent from "./components/ui/CookieConsent";

import { CSSTransition } from "react-transition-group";

import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Colors from "./scss/_colors.module.scss";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWindowDimensions } from "./components/utils";

library.add(fas);

const App: React.FC = () => {
  //const [userName, setUserName] = useState<string>("");
  const [progress, setProgress] = useState<number>(-1);
  const [scrobbles, setScrobbles] = useState<Array<Scrobble>>([]);

  const [showControls, setShowControls] = useState(true);
  const [showControlsButton, setShowControlsButton] = useState(false);

  const gridLoaderCss = css`
    margin: 10rem auto;
  `;

  const goOrsmth: Function = (u: string) => {
    fetchScrobbles(u, setProgress, setScrobbles);
    setShowControls(false);
    setShowControlsButton(true);
  };

  const { height } = useWindowDimensions();

  return (
    <div className="App" style={{ height: height }}>
      <Header>
        {showControlsButton && (
          <Button
            id="showControl"
            variant="dark"
            onClick={(e) => {
              e.preventDefault();
              setShowControls(!showControls);
            }}
            style={{ position: "absolute", height: "100%" }}
          >
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </Button>
        )}
      </Header>
      <CSSTransition
        in={progress >= 0 && progress < 100}
        unmountOnExit
        timeout={500}
        classNames="progress-container"
      >
        <ProgressBar value={Math.round(progress)} />
      </CSSTransition>
      <main>
        <CSSTransition
          in={showControls}
          unmountOnExit
          timeout={500}
          classNames="control-container"
        >
          <div className="control-container">
            <Controls startProcess={goOrsmth} />
          </div>
        </CSSTransition>

        <div className="table-container">
          {progress < 100 ? (
            <GridLoader
              size={50}
              color={Colors.dark}
              loading={progress >= 0}
              css={gridLoaderCss}
            />
          ) : (
            <ScrobbleTable scrobbles={scrobbles} />
          )}
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;
