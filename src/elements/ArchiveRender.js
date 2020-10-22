import React from "react";

import { useComponents } from "../hooks/useComponents";

export const ArchiveRender = ({
  edges = [],
  loading,
  error,
  hasPreviousPage,
  hasNextPage,
  next,
  prev,
  wrap,
}) => {
  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;

  if (edges.length < 1 && !loading) {
    return (
      <RenderWrapper className="mv4">
        <div>Nothing found.</div>
        <div
          className="dn"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
        />
      </RenderWrapper>
    );
  }

  const PaginationProps = {
    hasPreviousPage,
    hasNextPage,
    next,
    prev,
  };

  if (error) {
    return <components.ErrorRouting {...{ loading, error }} />;
  }

  return (
    <RenderWrapper className="entries">
      <components.Seo>
        <meta name="robots" content="noindex" />
      </components.Seo>

      {loading ? (
        <div className="entries">
          <components.ArchiveCard />
          <components.ArchiveCard />
          <components.ArchiveCard />
          <components.ArchiveCard />
        </div>
      ) : (
        <div className="entries">
          {edges.map((edge) => (
            <components.ArchiveCard key={edge.node.id} {...edge.node} />
          ))}
        </div>
      )}

      <components.Pagination {...PaginationProps} />
    </RenderWrapper>
  );
};
