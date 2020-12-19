import React from "react";

import { Scrobble } from "../lastfm";

import "./ScrobbleTable.scss";

import noCover from "../../img/no-cover.png";

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
      <div className="table-cell cover">
        <img src={s.image !== undefined ? s.image : noCover} alt="" />
      </div>

      <div className="table-cell song">{s.song}</div>
      <div className="table-cell album">{s.album}</div>
      <div className="table-cell artist">{s.artist}</div>
    </a>
  ));

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="table-cell cover"></div>
          <div className="table-cell song">Song</div>
          <div className="table-cell album">Album</div>
          <div className="table-cell artist">Artist</div>
        </div>
        {scrobbleTable}
      </div>
    </div>
  );
};

export default ScrobbleTable;
