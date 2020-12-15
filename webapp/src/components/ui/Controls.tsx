import React, { useState } from "react";

import "./Controls.css";

interface Props {
  startProcess: Function;
}

const Controls: React.FC<Props> = ({ startProcess }) => {
  const [text, setText] = useState<string>(
    localStorage.getItem("userName") !== null
      ? String(localStorage.getItem("userName"))
      : ""
  );

  const onSubmit = (e: any) => {
    e.preventDefault();

    localStorage.setItem("userName", text);
    startProcess(text);
  };

  return (
    <div className="controls">
      <form>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button id="go" onClick={(e) => onSubmit(e)}>
          go
        </button>
      </form>
    </div>
  );
};

export default Controls;
