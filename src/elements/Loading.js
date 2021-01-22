import React from "react";
import { useNodeContext } from "../Context";

export const Loading = (p) => {
  const { components: Components } = useNodeContext();
  if (Components?.Loading) return <Components.Loading {...p} />;

  const { color, ...props } = p;

  const style = {};
  if (color) {
    style.borderTopColor = color;
  }

  return (
    <span {...props}>
      <span className="rwg--loading">
        {Array.from(new Array(3)).map(() => (
          <span key={Math.random()} {...{ style }} />
        ))}
      </span>
    </span>
  );
};
