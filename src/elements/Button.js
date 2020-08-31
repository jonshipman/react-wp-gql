import React from "react";

export const Button = ({ children, className = "" }) => {
  return <div className={`${className} bg-light-gray pv2 ph3`}>{children}</div>;
};
