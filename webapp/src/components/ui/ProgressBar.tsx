import React from "react";

import { ProgressBar } from "react-bootstrap";

interface Props {
  value: number;
}

const ProgressBarOwn: React.FC<Props> = ({ value }) => {
  return (
    <ProgressBar animated striped variant="danger" now={value} label={`${value}%`}/>
  );
};

export default ProgressBarOwn;
