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
      {error || (!loading && edges.length < 1) ? (
        <components.ErrorRouting {...{ loading, error }} />
      ) : (
        <components.ArchiveRender {...{ edges, loading }} {...props} />
      )}
    </React.Fragment>
  );
};
