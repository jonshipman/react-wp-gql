import React from "react";

import { NodeProvider } from "./Context";
import { useArchive } from "./hooks/useArchive";

export const Archive = ({
  uri = "/blog",
  title = "Blog",
  components = {},
  ...props
}) => {
  const { edges, loading, error, ...hookProps } = useArchive();

  return (
    <NodeProvider value={{ components, ...props }}>
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
