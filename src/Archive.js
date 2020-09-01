import React from "react";

import { Populate } from "./Defaults";
import { NodeProvider } from "./Context";
import { useArchive } from "./hooks/useArchive";

export const Archive = ({
  uri = "/blog",
  title = "Blog",
  components = {},
  fragments = {},
  ...props
}) => {
  Populate({ components, fragments });

  const { edges, loading, error, ...hookProps } = useArchive();

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
