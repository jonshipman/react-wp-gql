import React from "react";
import { useParams } from "react-router-dom";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useSingle } from "./hooks/useSingle";

export const Preview = ({
  ifRestricted = () => {},
  components = {},
  fragments = {},
  ...props
}) => {
  const { revisionId } = useParams();

  const { node, loading, error } = useSingle({
    ssr: false,
    databaseId: revisionId,
  });
  PopulateComponents(components);
  PopulateFragments(fragments);

  if (loading || error || !node.id) {
    return <components.ErrorRouting loading={loading} error={error} />;
  }

  if (node.isRestricted) {
    ifRestricted(node);
  }

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.TitleRender {...node} />
      <components.SingleRender node={node} />
    </NodeProvider>
  );
};
