import { useContext } from "react";

import { NodeContext } from "../Context";

export const useComponents = () => {
  const { components } = useContext(NodeContext);

  if (!components) components = {};

  Object.keys(DefaultComponents).forEach((key) => {
    if (!components[key]) {
      components[key] = DefaultComponents[key];
    }
  });

  return { components };
};
