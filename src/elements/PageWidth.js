import React, { forwardRef } from "react";

let PageWidth = ({ children, className }, ref) => (
  <div className={`w-100 mw8 ph3 center ${className || ""}`} {...{ ref }}>
    {children}
  </div>
);

PageWidth = forwardRef(PageWidth);

export { PageWidth };
