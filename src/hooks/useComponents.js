import { useContext } from "react";

import { NodeContext } from "../Context";

export const useComponents = () => {
  const { components = {} } = useContext(NodeContext);
  return { components };
};
