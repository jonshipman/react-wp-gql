import React, { forwardRef } from "react";

let PageWidth = ({ children, className }, ref) => (
  <div className={`rwg--width ${className || ""}`} {...{ ref }}>
    {children}
  </div>
);

PageWidth = forwardRef(PageWidth);

export { PageWidth };
