import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NodeContext } from "../Context";
import { useComponents } from "../hooks";
import { useNode, useNodeRenderer } from "./useNode";

export const Node = ({
  isArchive: isArchiveProp,
  title: titleProp,
  columns = 1,
  wrap,
  card,
  entries,
  query,
  variables,
  skip,
  ssr,
  ...props
}) => {
  const { components } = useComponents();
  const { pathname } = useLocation();
  const { siteName } = useContext(NodeContext);

  const nodeUsed = useNode({
    query,
    variables,
    skip,
    ssr,
  });

  const {
    __typename,
    data,
    edges,
    error,
    hasNextPage,
    hasPreviousPage,
    isArchive: isArchiveNode,
    loading,
    next,
    node,
    prev,
  } = nodeUsed;

  const isArchive = isArchiveProp ? isArchiveProp : isArchiveNode;

  const RenderComponent = useNodeRenderer(__typename, isArchive);

  const seo = node.seo || {
    title: !!titleProp ? titleProp : !!node.title ? node.title : node.name,
  };

  if (siteName && !node.seo) {
    seo.title = `${seo.title} - ${siteName}`;
  }

  if (!titleProp && loading && !node.seo) {
    seo.title = siteName ? `... - ${siteName}` : "...";
  }

  const uri = node.uri || pathname;

  if (isArchive) {
    const Wrapper = wrap ? wrap : components.PageWidth;

    const PaginationProps = {
      hasPreviousPage,
      hasNextPage,
      next,
      prev,
    };

    return (
      <React.Fragment>
        <components.Seo {...{ uri }} {...seo}>
          <meta name="robots" content="noindex" />
        </components.Seo>

        <components.Title>{titleProp || node.name}</components.Title>

        <Wrapper
          className="mv4 archive"
          {...{ edges, loading, error, __typename, node, data }}
          {...props}
        >
          {error ? (
            <components.ErrorRouting {...{ loading, error, wrap: "div" }} />
          ) : edges?.length === 0 && !loading ? (
            <div className="archive-nothing-found">
              <div>Nothing found.</div>
              <div
                className="dn"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
              />
            </div>
          ) : (
            <React.Fragment>
              <RenderComponent
                {...{
                  card,
                  entries,
                  columns,
                  loading,
                  edges,
                  node,
                  data,
                }}
              />
              <components.Pagination {...PaginationProps} />
            </React.Fragment>
          )}
        </Wrapper>
      </React.Fragment>
    );
  } else {
    if (!skip && (error || (!loading && !node?.id))) {
      return <components.ErrorRouting {...{ error, loading }} />;
    }

    return (
      <article
        className={`single ${__typename?.toLowerCase()}-${
          node?.databaseId || "0"
        }`}
      >
        <components.Seo {...{ uri }} {...seo} />

        <RenderComponent {...{ wrap, node, data, loading, error }} {...props} />
      </article>
    );
  }
};
