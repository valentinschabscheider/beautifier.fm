import React from "react";

import "./ProgressBar.scss";

import { ProgressBar } from "react-bootstrap";

interface Props {
  value: number;
  text?: string | null;
  css?: object;
}

const ProgressBarOwn: React.FC<Props> = ({ value, text, css }) => {
  return (
    <ProgressBar animated striped variant="danger" now={value} label={`${value}%`}/>
  );
};

export default ProgressBarOwn;
