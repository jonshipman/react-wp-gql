import React, { forwardRef, createElement } from "react";

import { useComponents } from "../hooks/useComponents";
import { PageWidth } from "./PageWidth";

let Title = ({ notHeading, className = "", children, ...props }, ref) => {
  let { components } = useComponents();
  components = Object.assign({}, { PageWidth }, components);

  const Wrap = createElement(notHeading ? "div" : "h1", {});
  const WrapType = Wrap.type;

  return (
    <div className={`bg-near-white ${className}`} {...props}>
      <components.PageWidth>
        <WrapType className="title ma0 lh-solid pv4">
          <span className="f4 fw4 db" ref={ref}>
            {children}
          </span>
        </WrapType>
      </components.PageWidth>
    </div>
  );
};

Title = forwardRef(Title);

export { Title };
