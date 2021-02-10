import React, { useRef } from "react";
import { Populate } from "./Defaults";
import { NodeContext } from "./Context";

export const NodeProvider = ({
  children,
  fragments = {},
  queries = {},
  mutations = {},
  ...passed
}) => {
  const props = { ...passed };
  const refactored = Populate({ fragments, queries, mutations });

  const internalNodeRef = useRef({});
  const internalEdgesRef = useRef({});
  const internalDataRef = useRef({});
  const internalNodeLoading = useRef();
  const internalNodeError = useRef({});

  // Used to force <Permissions> to render to check capabilities.
  const permissions = useRef({ refetch: [] });

  if (!props.node) {
    props.node = internalNodeRef;
  }

  if (!props.edges) {
    props.edges = internalEdgesRef;
  }

  if (!props.data) {
    props.data = internalDataRef;
  }

  if (!props.nodeLoading) {
    props.nodeLoading = internalNodeLoading;
  }

  if (!props.nodeError) {
    props.nodeError = internalNodeError;
  }

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
