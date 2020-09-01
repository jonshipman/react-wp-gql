import React, { forwardRef, createElement } from "react";

import { useComponents } from "../hooks/useComponents";
import { PageWidth } from "./PageWidth";

let Title = ({ notHeading, className = "", children, ...props }, ref) => {
  const { components } = useComponents();
  const PageWidthLocal = components.PageWidth || PageWidth;

  const Wrap = createElement(notHeading ? "div" : "h1", {});
  return (
    <div className={`bg-near-white ${className}`} {...props}>
      <PageWidthLocal>
        <Wrap.type className="title ma0 lh-solid pv4">
          <span className="f4 fw4 db" ref={ref}>
            {children}
          </span>
        </Wrap.type>
      </PageWidthLocal>
    </div>
  );
};

Title = forwardRef(Title);

export { Title };
