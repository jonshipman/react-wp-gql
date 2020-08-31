import React from "react";

import { useComponents } from "../hooks/useComponents";

export const ArchiveRender = ({
  edges = [],
  hasPreviousPage,
  hasNextPage,
  next,
  prev,
}) => {
  const { components } = useComponents();

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
