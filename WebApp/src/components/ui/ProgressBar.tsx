import React from "react";

import "./ProgressBar.css";

interface Props {
  value: number;
  text?: string | null;
  css?: object;
}

const ProgressBar: React.FC<Props> = ({ value, text, css }) => {
  return (
    <div className="progress-container" {...(css && { style: css })}>
      <div
        id="progress-bar"
        className="progress-bar"
        style={{ width: `${value}%` }}
      >
        <span style={{ visibility: text === null ? "hidden" : "visible" }}>
          {text || `${value}%`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
