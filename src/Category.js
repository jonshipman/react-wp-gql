import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useCategory } from "./hooks/useCategory";

export const Category = ({ components = {}, fragments = {}, ...props }) => {
  const {
    category: { name, uri, seo = {} },
    edges,
    loading,
    error,
    ...hookProps
  } = useCategory();
  PopulateComponents(components);
  PopulateFragments(fragments);

  return (
    <NodeProvider value={{ components, fragments, ...hookProps }}>
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
