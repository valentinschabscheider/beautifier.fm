import React from "react";

import { Scrobble } from "../lastfm";

import "./ScrobbleTable.css";

interface Props {
  scrobbles: Array<Scrobble>;
}

const ScrobbleTable: React.FC<Props> = ({ scrobbles }) => {
  const scrobbleTable: any = scrobbles.map((s, index) => (
    <a
      key={index}
      className="table-row"
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="table-cell">{s.song}</div>
      <div className="table-cell">{s.album}</div>
      <div className="table-cell">{s.artist}</div>
    </a>
  ));

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="table-cell">Song</div>
          <div className="table-cell">Album</div>
          <div className="table-cell">Artist</div>
        </div>
        {scrobbleTable}
      </div>
    </div>
  );
};

export default ScrobbleTable;
