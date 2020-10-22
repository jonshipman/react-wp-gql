import React from "react";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  to = "/",
  onClick,
  className = "pointer bg-primary pv2 ph3 dib bn",
}) => {
  if (onClick) {
    return <div {...{ className, onClick }}>{children}</div>;
  }

  return (
    <div {...{ className }}>
      <Link {...{ to }} className="color-inherit no-underline">
        {children}
      </Link>
    </div>
  );
};
