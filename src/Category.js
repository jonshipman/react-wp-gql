import React from "react";

import { useCategory } from "./hooks/useCategory";
import { useComponents } from "./hooks/useComponents";

export const Category = () => {
  const { components } = useComponents();

  const {
    category: { name, uri, seo = {} },
    edges,
    loading,
    error,
    ...props
  } = useCategory();

  return (
    <React.Fragment>
      <components.Seo title={seo.title} canonical={uri} />

      <components.Title>{name}</components.Title>
      {loading || error || !edges.length ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.ArchiveRender edges={edges} {...props} />
      )}
    </React.Fragment>
  );
};
