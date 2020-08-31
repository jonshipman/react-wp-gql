import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useSingle } from "./hooks/useSingle";

export const Single = ({ components = {}, fragments = {}, ...props }) => {
  const { node, loading, error } = useSingle();
  PopulateComponents(components);
  PopulateFragments(fragments);

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.TitleRender {...node} />
      {loading || error || !node.id ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.SingleRender node={node} />
      )}
    </NodeProvider>
  );
};
