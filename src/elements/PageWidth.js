import React, { forwardRef } from "react";
import { useNodeContext } from "../Context";

let PageWidth = (props, ref) => {
  const { components: Components } = useNodeContext();
  if (Components?.PageWidth)
    return <Components.PageWidth {...props} {...{ ref }} />;
  const { children, className } = props;

  return (
    <div className={`rwg--width ${className || ""}`} {...{ ref }}>
      {children}
    </div>
  );
};

PageWidth = forwardRef(PageWidth);

export { PageWidth };
