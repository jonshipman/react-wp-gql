import React, { useContext } from "react";

import { NodeContext } from "./Context";
import { useArchive } from "./hooks/useArchive";
import { useComponents } from "./hooks/useComponents";

export const Archive = ({ uri = "/blog", title = "Blog" }) => {
  const { components } = useComponents();
  const { siteName = "" } = useContext(NodeContext);

  const renderProps = useArchive();

  let seoTitle = title;
  if (siteName) {
    seoTitle = `${title} - ${siteName}`;
  }

  return (
    <React.Fragment>
      <components.Seo title={seoTitle} canonical={uri} />

      <components.Title>{title}</components.Title>

      <components.ArchiveRender {...renderProps} />
    </React.Fragment>
  );
};
