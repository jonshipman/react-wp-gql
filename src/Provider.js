import React, { useState } from "react";

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
  const [prevComponentRoute, setPrevComponentRoute] = useState();

  return (
    <NodeContext.Provider
      value={{
        ...refactored,
        ...props,
        setPrevComponentRoute,
        prevComponentRoute,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
