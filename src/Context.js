import React, { createContext } from "react";

import { PopulateComponents, PopulateFragments } from "./Defaults";

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
  PopulateComponents(components);
  PopulateFragments(fragments);

  return (
    <NodeContext.Provider value={{ components, fragments, ...props }}>
      {children}
    </NodeContext.Provider>
  );
};

export { NodeProvider, NodeContext };
