import React, { createContext } from "react";

import { Populate } from "./Defaults";

const NodeContext = createContext({
  components: {},
  fragments: {},
  queries: {},
  FRONTEND_URL: "",
});

const NodeProvider = ({
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

export { NodeProvider, NodeContext };
