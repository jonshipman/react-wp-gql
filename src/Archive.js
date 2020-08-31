import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useArchive } from "./hooks/useArchive";

export const Archive = ({
  components = {},
  fragments = {},
  uri = "/blog",
  title = "Blog",
  ...props
}) => {
  const { edges, loading, error, ...hookProps } = useArchive();
  PopulateComponents(components);
  PopulateFragments(fragments);

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.Seo title={title} canonical={uri} />

      <components.Title>{title}</components.Title>
      {loading || error || !edges.length ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.ArchiveRender edges={edges} {...hookProps} />
      )}
    </NodeProvider>
  );
};
