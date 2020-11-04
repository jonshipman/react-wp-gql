import React from "react";

import { useComponents } from "../hooks/useComponents";
import { useRenderer } from "../hooks";

export const ArchiveRender = ({
  __typename,
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
  const Card = useRenderer("card", __typename, components.ArchiveCard);

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
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      ) : (
        <div className="entries">
          {edges.map((edge) => (
            <Card key={edge.node.id} {...edge.node} />
          ))}
        </div>
      )}

      <components.Pagination {...PaginationProps} />
    </RenderWrapper>
  );
};
