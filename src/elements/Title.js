import React, { forwardRef } from "react";

import { useComponents } from "../hooks/useComponents";

let Title = (
  { notHeading, wrap = "h1", className = "", children, ...props },
  ref,
) => {
  const { components } = useComponents();

  const Wrap = notHeading ? "div" : wrap;

  return (
    <div className={`rwg--title-wrap ${className}`} {...props}>
      <components.PageWidth>
        <Wrap className="rwg--title">
          <span {...{ ref }}>
            {children ? children : <components.SkullLine />}
          </span>
        </Wrap>
      </components.PageWidth>
    </div>
  );
};

Title = forwardRef(Title);

export { Title };
