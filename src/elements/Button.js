import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ children, to = "/", onClick, className = "" }) => {
  if (onClick) {
    return (
      <div
        className={`${className} bg-light-gray pv2 ph3 dib`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={`${className} bg-light-gray pv2 ph3 dib`}>
      <Link to={to} className="color-inherit no-underline">
        {children}
      </Link>
    </div>
  );
};
