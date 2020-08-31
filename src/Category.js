import React from "react";

import { NodeProvider } from "./Context";
import { useCategory } from "./hooks/useCategory";

export const Category = (props) => {
  const {
    category: { name, uri, seo = {} },
    edges,
    loading,
    error,
    ...hookProps
  } = useCategory();

  return (
    <NodeProvider value={props}>
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
