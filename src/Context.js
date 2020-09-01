import React, { createContext } from "react";

import { Populate } from "./Defaults";

const NodeContext = createContext({
  components: {},
  fragments: {},
  FRONTEND_URL: "",
});

const NodeProvider = ({
  children,
  components = {},
  fragments = {},
  ...props
}) => {
  Populate({ components, fragments });

  return (
    <NodeContext.Provider value={{ components, fragments, ...props }}>
      {children}
    </NodeContext.Provider>
  );
};

export { NodeProvider, NodeContext };
