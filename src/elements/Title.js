import React, { forwardRef } from "react";
import { useNodeContext } from "../Context";
import { SkullLine } from "./Skeleton";

export const Title = forwardRef((p, ref) => {
  const { components: Components } = useNodeContext();
  if (Components?.Title) return <Components.Title {...p} {...{ ref }} />;

  const {
    notHeading,
    className = "",
    wrap: PageWrap = "div",
    children,
    ...props
  } = p;
  const Wrap = notHeading ? "div" : "h1";

  return (
    <div className={`rwg--title-wrap ${className}`} {...props}>
      <PageWrap>
        <Wrap className="rwg--title">
          <span {...{ ref }}>{children ? children : <SkullLine />}</span>
        </Wrap>
      </PageWrap>
    </div>
  );
});
