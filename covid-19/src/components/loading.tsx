import * as React from "react";
import { Component } from "react";
import "../Style.css";

const Loading: React.SFC = () => {
  return (
    <div
      className="spinner-border text-primary loading-position "
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
