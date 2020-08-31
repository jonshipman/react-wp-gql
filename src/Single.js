import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useSingle } from "./hooks/useSingle";

export const Single = ({ components = {}, fragments = {}, ...props }) => {
  const { node, loading, error } = useSingle();
  PopulateComponents(components);
  PopulateFragments(fragments);

  console.log(node, loading, error, components);

  if (loading || error || !node.id) {
    return <components.ErrorRouting loading={loading} error={error} />;
  }

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.TitleRender {...node} />
      <components.SingleRender node={node} />
    </NodeProvider>
  );
};
