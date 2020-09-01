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
  Populate({ components, fragments, queries });

  return (
    <NodeContext.Provider value={{ components, fragments, queries, ...props }}>
      {children}
    </NodeContext.Provider>
  );
};
