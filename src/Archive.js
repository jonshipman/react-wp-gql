import React from "react";

import { useArchive } from "./hooks/useArchive";
import { useComponents } from "./hooks/useComponents";

export const Archive = ({ uri = "/blog", title = "Blog" }) => {
  const { components } = useComponents();

  const { edges, loading, error, ...hookProps } = useArchive();

  return (
    <React.Fragment>
      <components.Seo title={title} canonical={uri} />

      <components.Title>{title}</components.Title>
      {loading || error || !edges.length ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <components.ArchiveRender edges={edges} {...hookProps} />
      )}
    </React.Fragment>
  );
};
