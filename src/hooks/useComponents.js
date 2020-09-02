import { useContext } from "react";

import { NodeContext } from "../Context";

export const useComponents = () => {
  let { components } = useContext(NodeContext);

  if (!components) components = {};

  return { components };
};
