import React from "react";

import { useComponents } from "../hooks/useComponents";
import { PageWidth } from "./PageWidth";
import { Seo } from "./Seo";
import { ArchiveCard } from "./ArchiveCard";
import { Pagination } from "./Pagination";

export const ArchiveRender = ({
  edges = [],
  hasPreviousPage,
  hasNextPage,
  next,
  prev,
}) => {
  let { components } = useComponents();
  components = Object.assign(
    {},
    { PageWidth, Seo, ArchiveCard, Pagination },
    components,
  );

  if (!edges.length) {
    return <components.PageWidth>Nothing found.</components.PageWidth>;
  }

  const PaginationProps = {
    hasPreviousPage,
    hasNextPage,
    next,
    prev,
  };

  return (
    <components.PageWidth className="entries">
      <components.Seo>
        <meta name="robots" content="noindex" />
      </components.Seo>

      <div className="entries">
        {edges.map((edge) => (
          <components.ArchiveCard key={edge.node.id} {...edge.node} />
        ))}
      </div>

      <components.Pagination {...PaginationProps} />
    </components.PageWidth>
  );
};
