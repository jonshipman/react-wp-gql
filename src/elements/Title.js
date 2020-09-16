import React, { forwardRef, createElement } from "react";

import { useComponents } from "../hooks/useComponents";

let Title = ({ notHeading, className = "", children, ...props }, ref) => {
  const { components } = useComponents();

  const Wrap = createElement(notHeading ? "div" : "h1", {});
  const WrapType = Wrap.type;

  return (
    <div className={`bg-near-white ${className}`} {...props}>
      <components.PageWidth>
        <WrapType className="title ma0 lh-solid pv4">
          <span className="f4 fw4 db" ref={ref}>
            {children ? (
              children
            ) : (
              <components.SkullLine className="w-100 mw6" />
            )}
          </span>
        </WrapType>
      </components.PageWidth>
    </div>
  );
};

Title = forwardRef(Title);

export { Title };
