import React from "react";

export const Loading = ({ color, ...props }) => {
  const style = {};
  if (color) {
    style.borderTopColor = color;
  }

  return (
    <span {...props}>
      <span className="rwg--loading">
        {Array.from(new Array(3)).map(() => (
          <span key={Math.random()} style={style} />
        ))}
      </span>
    </span>
  );
};
