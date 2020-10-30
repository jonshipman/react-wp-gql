import React from "react";

import { Populate } from "./Defaults";
import { NodeContext } from "./Context";

export const NodeProvider = ({
  children,
  components = {},
  fragments = {},
  queries = {},
  mutations = {},
  ...props
}) => {
  const refactored = Populate({ components, fragments, queries, mutations });

  return (
    <NodeContext.Provider
      value={{
        ...refactored,
        ...props,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
