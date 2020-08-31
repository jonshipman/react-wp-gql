import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useArchive } from "./hooks/useArchive";

export const Archive = ({ components = {}, fragments = {}, ...props }) => {
  const { edges, loading, error, ...hookProps } = useArchive();
  PopulateComponents(components);
  PopulateFragments(fragments);

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.Seo title="Blog" canonical="/blog" />

      <components.Title>Blog</components.Title>
      {loading || error || !edges.length ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.ArchiveRender edges={edges} {...hookProps} />
      )}
    </NodeProvider>
  );
};
