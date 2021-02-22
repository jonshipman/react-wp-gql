import React, { forwardRef } from "react";
import { useNodeContext } from "../Context";
import { PageWidth } from "./PageWidth";
import { SkullLine } from "./Skeleton";

export const Title = forwardRef((p, ref) => {
  const { components: Components } = useNodeContext();
  if (Components?.Title) return <Components.Title {...p} {...{ ref }} />;

  const { notHeading, wrap = "h1", className = "", children, ...props } = p;

  const Wrap = notHeading ? "div" : wrap;

  return (
    <div className={`rwg--title-wrap ${className}`} {...props}>
      <PageWidth>
        <Wrap className="rwg--title">
          <span {...{ ref }}>{children ? children : <SkullLine />}</span>
        </Wrap>
      </PageWidth>
    </div>
  );
});
