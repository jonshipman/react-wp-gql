import React from "react";
import { useNodeContext } from "../Context";

export const LoadingError = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.LoadingError) return <Components.LoadingError {...props} />;
  const { error = "" } = props;

  return <React.Fragment>{`Error: ${error}`}</React.Fragment>;
};
