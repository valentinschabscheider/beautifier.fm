import React, { useState } from "react";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProgressBarOwn from "./components/ui/ProgressBar";

import "./App.scss";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import fetchScrobbles from "./components/lastfm";
import { Scrobble } from "./components/lastfm";
import MaterialTableOwn from "./components/MaterialTable/MaterialTable";

library.add(fas)

const App: React.FC = () => {
  //const [userName, setUserName] = useState<string>("");
  const [progress, setProgress] = useState<number>(-1);
  const [scrobbles, setScrobbles] = useState<Array<Scrobble>>([]);

  return (
    <div className="App">
      <Header startProcess={(u: string) => fetchScrobbles(u, setProgress, setScrobbles)} />
      <main>
          {progress >= 0 && progress < 100 && (
            <ProgressBarOwn value={Math.round(progress)} />
          )}
        {progress < 100 ? (
          null
        ) : (
          <MaterialTableOwn scrobbles={scrobbles} isLoading={ progress < 100 } />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
