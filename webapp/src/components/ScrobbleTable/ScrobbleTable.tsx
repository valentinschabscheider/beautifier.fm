import React from "react";

import { Scrobble } from "../lastfm";

import "./ScrobbleTable.css";

interface Props {
  scrobbles: Array<Scrobble>;
}

const ScrobbleTable: React.FC<Props> = ({ scrobbles }) => {
  const scrobbleTable: any = scrobbles.map((s, index) => (
    <a key={index} className="table-row" href="/mylink">
      <div className="table-cell">{s.song}</div>
      <div className="table-cell">{s.album}</div>
      <div className="table-cell">{s.artist}</div>
    </a>
  ));

  return (
    <div className="table-container">
      {" "}
      <div className="table">{scrobbleTable}</div>
    </div>
  );
};

export default ScrobbleTable;
