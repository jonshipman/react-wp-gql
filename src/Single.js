import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useSingle } from "./hooks/useSingle";

export const Single = ({ components = {}, fragments = {}, ...props }) => {
  const { node, loading, error } = useSingle();
  PopulateComponents(components);
  PopulateFragments(fragments);

  console.log(node, error, loading);

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      {loading || error || !node.id ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <React.Fragment>
          <components.SingleTitle {...node} />
          <components.SingleRender node={node} />
        </React.Fragment>
      )}
    </NodeProvider>
  );
};
