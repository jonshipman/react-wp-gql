import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ children, to = "/", className = "" }) => {
  return (
    <div className={`${className} bg-light-gray pv2 ph3 dib`}>
      <Link to={to}>{children}</Link>
    </div>
  );
};
