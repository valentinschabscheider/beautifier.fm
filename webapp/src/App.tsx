import React, { useState } from "react";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProgressBar from "./components/ui/ProgressBar";
import Controls from "./components/ui/Controls";
import ScrobbleTable from "./components/ScrobbleTable/ScrobbleTable";

import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Colors from "./scss/_colors.module.scss";

import "./App.scss";

import fetchScrobbles from "./components/lastfm";
import { Scrobble } from "./components/lastfm";

const App: React.FC = () => {
  //const [userName, setUserName] = useState<string>("");
  const [progress, setProgress] = useState<number>(-1);
  const [scrobbles, setScrobbles] = useState<Array<Scrobble>>([]);

  const gridLoaderCss = css`
    margin: auto;
  `;

  return (
    <div className="App">
      <Header />
      <main>
        <div className="top-container">
          <Controls
            startProcess={(u: string) =>
              fetchScrobbles(u, setProgress, setScrobbles)
            }
          />
          {progress >= 0 && progress < 100 && (
            <ProgressBar value={Math.round(progress)} />
          )}
        </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
