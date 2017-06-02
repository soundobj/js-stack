import React from "react";
import "./version.scss";
import packageJson from "../../../../package.json";

export default () => {
  return (<div className="version"><span className="version__build">{packageJson.version}</span></div>);
};