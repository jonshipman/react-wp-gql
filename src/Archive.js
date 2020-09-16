import React, { useContext } from "react";

import { NodeContext } from "./Context";
import { useArchive } from "./hooks/useArchive";
import { useComponents } from "./hooks/useComponents";
import { usePreviousRoute } from "./hooks/useComponentHistory";

export const Archive = ({ uri = "/blog", title = "Blog" }) => {
  const { components } = useComponents();
  const { siteName = "" } = useContext(NodeContext);
  usePreviousRoute("Archive");

  const { edges, loading, error, ...hookProps } = useArchive();

  let seoTitle = title;
  if (siteName) {
    seoTitle = `${title} | ${siteName}`;
  }

  return (
    <React.Fragment>
      <components.Seo title={seoTitle} canonical={uri} />

      <components.Title>{title}</components.Title>
      {error || (!loading && edges.length < 1) ? (
        <components.ErrorRouting {...{ loading, error }} />
      ) : (
        <components.ArchiveRender {...{ edges, loading }} {...hookProps} />
      )}
    </React.Fragment>
  );
};
