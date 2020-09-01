import React from "react";

import { NodeProvider } from "./Context";
import { Populate } from "./Defaults";
import { useCategory } from "./hooks/useCategory";

export const Category = ({ components = {}, fragments = {}, ...props }) => {
  Populate({ components, fragments });

  const {
    category: { name, uri, seo = {} },
    edges,
    loading,
    error,
    ...hookProps
  } = useCategory();

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.Seo title={seo.title} canonical={uri} />

      <components.Title>{name}</components.Title>
      {loading || error || !edges.length ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.ArchiveRender edges={edges} {...hookProps} />
      )}
    </NodeProvider>
  );
};
