import React, { useRef } from "react";
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

  // Used to force <Permissions> to render to check capabilities.
  const permissions = useRef({ refetch: [] });

  return (
    <NodeContext.Provider
      value={{
        permissions,
        ...refactored,
        ...props,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
