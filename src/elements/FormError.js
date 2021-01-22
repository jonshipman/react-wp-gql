import React from "react";
import { useNodeContext } from "../Context";

export const FormError = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.FormError) return <Components.FormError {...props} />;
  const { children } = props;

  return <div className="rwg--err-msg">{children}</div>;
};
