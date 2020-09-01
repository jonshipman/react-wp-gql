import React from "react";

import { Populate } from "./Defaults";
import { NodeContext } from "./Context";

export const NodeProvider = ({
  children,
  components = {},
  fragments = {},
  queries = {},
  ...props
}) => {
  const refactored = Populate({ components, fragments, queries });

  return (
    <NodeContext.Provider value={{ ...refactored, ...props }}>
      {children}
    </NodeContext.Provider>
  );
};
