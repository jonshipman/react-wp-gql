import React, { forwardRef } from "react";

import { useComponents } from "../hooks/useComponents";

let Title = (
  { notHeading, wrap = "h1", className = "", children, ...props },
  ref,
) => {
  const { components } = useComponents();

  const Wrap = notHeading ? "div" : wrap;

  return (
    <div className={`bg-near-white ${className}`} {...props}>
      <components.PageWidth>
        <Wrap className="title ma0 lh-solid pv4">
          <span className="f4 fw4 db" {...{ ref }}>
            {children ? (
              children
            ) : (
              <components.SkullLine className="w-100 mw6" />
            )}
          </span>
        </Wrap>
      </components.PageWidth>
    </div>
  );
};

Title = forwardRef(Title);

export { Title };
